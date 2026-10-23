# CLAUDE.md

Guía para trabajar en **Synergia**: una web que conecta *professionals* (desarrolladores) con *organizations* (empresas que buscan talento). La UI está en inglés; los comentarios del código mezclan español e inglés (se acepta cualquiera de los dos).

## Comandos

Gestor de paquetes: **pnpm** (hay `pnpm-lock.yaml`).

```bash
pnpm install
pnpm dev      # next dev, http://localhost:3000
pnpm build    # next build (también hace type-check)
pnpm lint     # eslint . (flat config en eslint.config.mjs, extiende eslint-config-next/core-web-vitals)
pnpm test     # runner nativo de Node sobre src/**/*.test.ts
```

`pnpm test` usa `node --test` con TypeScript nativo (los tests importan con extensión `.ts`). Solo cubre las libs puras: `lib/search.test.ts`, `lib/initials.test.ts` y `lib/home-stats.test.ts`. No hay tests de UI. Para verificar un cambio: `pnpm test`, `pnpm lint`, `pnpm build` y probarlo en el navegador a 1280px y 390px de ancho.

- `bcrypt` (v6) trae binarios precompilados y se carga con `node-gyp-build`. Igual, `package.json` mantiene `pnpm.onlyBuiltDependencies` para que pnpm 10 ejecute su script de install.

## Variables de entorno

Copiar `.env.example` a `.env`:

- `MONGO_URL`: connection string de MongoDB (se usa en `src/app/lib/config/db.js`).
- `AUTH_SECRET`: secreto de next-auth para cifrar el JWT (`npx auth secret`).

## Stack

- Next `16` (App Router, carpeta `src/`, Turbopack), React `19`, next-auth `5.0.0-beta.32` (v5 sigue en beta), TypeScript 6.
- Mongoose 9, Zod 4, bcrypt 6, Tailwind 4, ESLint 9, `clsx`. Para lo responsive se usan los breakpoints de Tailwind (no hay `useMediaQuery`).
- APIs de Next 16: `params` y `searchParams` son Promises (`{ params }: { params: Promise<{ id: string }> }` y luego `await params`); `headers()` y `cookies()` también son async. `useActionState` se importa de `react`.
- TypeScript se queda en 6.x y ESLint en 9.x porque typescript-eslint y los plugins de eslint-config-next todavía no soportan TS 7 ni ESLint 10.
- Alias de imports: `@/*` → `src/*`. `auth.ts` está en la raíz (fuera de `src`), así que se importa con rutas relativas (`../../../../auth`) o `@/../auth`.

## Arquitectura

### Autenticación (next-auth v5, Credentials + JWT)
- `auth.config.ts`: configuración apta para edge (sin bcrypt ni Mongo). Contiene los callbacks `jwt`/`session`, que copian `id`, `name`, `email` y `type` al token y a la sesión, y `authorized`, que protege las rutas.
- `auth.ts`: extiende `authConfig` con el provider Credentials (Zod + `getUserByEmail` + `bcrypt.compare`). Exporta `auth`, `signIn` y `signOut`. Solo funciona en Node.
- `src/proxy.ts` (antes `middleware.ts`; en Next 16 se llama proxy): `NextAuth(authConfig).auth`. Reglas: `/me` y `/inbox` requieren sesión (si no hay, redirige a `/sign-in`); `/account`, `/sign-in` y `/sign-up` redirigen a `/me` si ya hay sesión.
- Los tipos extendidos de `Session`, `User` y `JWT` (`id`, `type: "professional" | "organization"`) están en `src/app/lib/types/nextauth.d.ts`. Si agregas un campo a la sesión, actualízalo ahí y en los dos callbacks.
- Sign out: server action inline en `ui/navbar/navbar.tsx`.

### Datos (MongoDB / Mongoose)
- `lib/config/db.js`: `dbConnect()` cachea la conexión en `global.mongoose`. Hay que llamarlo antes de cada query.
- `lib/config/models/user.ts`: el `userSchema` base (name, email, password, description, image, type). `professionals.ts` y `organizations.ts` lo extienden con `...userSchema.obj`.
  - Professional: `experience` (1–20), `specialty`, `employmentStatus` (`employed`/`unemployed`).
  - Organization: `area`, `website?`.
  - Son **dos colecciones separadas** (`Professionals` y `Organizations`). Para buscar un usuario genérico se consulta una y después la otra (`getUserById`, `getUserByEmail`).
- `lib/types/general.ts` es la **fuente única** de los enums `specialties` y `areas` (con `as const`), de sus mapas de colores (`specialtyColors` y `areaColors`) y de los tipos `User`, `Professional`, `Organization` y `*WithColors`. Mongoose, Zod y los `<datalist>` de los formularios leen de aquí. Si agregas una specialty o un área, agrega también su color.
- `lib/utils.ts`: `formatProfessional(s)` y `formatOrganization(s)` convierten los documentos de Mongoose en objetos planos serializables (`_id` como string) y añaden `color` y `cardColor` (con `hexToRGBA` y opacidad 0.7). Las páginas siempre trabajan con `*WithColors`.

### Capa de servidor
- `lib/data/read.ts` (`"use server"`): `getAll*`, `get*ById`, `getUserById` (devuelve `{ formattedProfessional, formattedOrganization }`, uno de los dos es null) y `getUserByEmail`. Para los listados y la home: `searchProfessionals`, `searchOrganizations`, `getTopSpecialties`, `getTopAreas` y `getHomeStats`. Los errores se loguean y se relanzan con un mensaje genérico.
- Libs puras (con tests): `lib/search.ts` convierte los `searchParams` de la URL (`q`, `specialty`, `exp`, `open`, `area`) en filtros validados y en queries de Mongo (el texto se escapa como literal; valores inválidos se ignoran, si se repiten se toma el primero) y arma los links con `buildSearchHref`. `lib/initials.ts` saca las iniciales para el avatar. `lib/home-stats.ts` calcula `HomeStats` con `summarizeHomeStats`.
- `lib/data/actions.ts` (`"use server"`): server actions de formularios.

### Patrón para formularios (seguirlo para formularios nuevos)
1. Schema Zod en `actions.ts`. Los de edición se derivan con `.omit({ email, password })`. Los números llegan como string, por eso se usa `z.coerce.number()`.
2. Tipo de estado `XState = { errors?: { campo?: string[]; server?: string[] } | null; message?: string | null }`.
3. Action `(prevState, formData)`: `Object.fromEntries(formData)` → `safeParse`. Si falla, devuelve `z.flattenError(error).fieldErrors`. En Zod 4 los mensajes se pasan con `error` (string o función), no con `message`/`invalid_type_error`, y se usan `z.email()`/`z.url()` en vez de `z.string().email()`/`.url()`. Si pasa: `dbConnect()` y la operación, dentro de try/catch, con un mensaje genérico en `errors.server`.
4. Si hay que pasar un id, se hace con `action.bind(null, id)` desde el cliente.
5. `revalidatePath()` va **fuera** del try/catch y antes del `return` (lanza internamente).
6. El componente cliente usa `useActionState(action, initialState)`. Si hay que reaccionar al resultado (mensajes temporales, cerrar un modal), se envuelve el action en `useActionState` en vez de usar `useEffect` (la regla `react-hooks/set-state-in-effect` lo marca como error). Cada input lleva `aria-describedby="campo-error"` y debajo un `<div id="campo-error" aria-live="polite">` que lista los errores con la clase `input-error`. El mensaje global usa `form-error` o `form-success`.

### Routing y UI
```
src/app/
  layout.tsx            Navbar sticky (h-16) + <main> + Footer, fuente Epilogue local
  page.tsx              Home (Hero + bento de stats + band)
  (pages)/
    loading.tsx         Loader animado
    about/  inbox/      inbox es un placeholder
    (look-for)/professionals, opportunities   listados de cards (LookForPage + SearchFilters)
    (account)/account, sign-up            NewHere (elegir tipo de cuenta)
    (account)/sign-in, sign-up/{professional,organization}   usan AuthLayout
    (account)/(profile)/me     perfil propio (ProfileView + modal de edición)
    (account)/(profile)/[id]   perfil público por _id (ProfileView)
  ui/                   componentes por dominio (account, avatar, buttons, cards, footer, home, loader, navbar, pages, profile, search, tag)
```
- Para páginas nuevas, usar los contenedores de `ui/pages/pages.tsx`: `MainPage` (`header` como ReactNode en `.display`, `text` opcional y `children`) o `LookForPage` (header con contador, `SearchFilters`, estado vacío y grid de cards). El header sticky está en el flujo, no hace falta compensar con padding superior.
- Contenedor único de página: `w-full max-w-7xl mx-auto px-4 lg:px-10` (home, `MainPage`, `LookForPage`, `ProfileView` y not-found). En `ProfileView` la banda de color ocupa todo el ancho y el contenedor va adentro. No usar `w-screen` (100vw incluye la scrollbar y genera scroll horizontal); `<main>` tiene `overflow-x-clip` como red de seguridad (nunca `overflow-hidden` en `body`: rompe el sticky).
- Primitivas: `LinkButton` (navegación) y `PrimaryButton` (con `action` y `type`) en `ui/buttons/buttons.tsx`, ambos con `variant` `dark | light | white`. `Tag` en `ui/tag/tag.tsx` (specialty/área/estado). `Avatar` en `ui/avatar/avatar.tsx`: muestra la imagen y, si falta o está rota, las iniciales (`lib/initials.ts`).
- Cards (`ui/cards/*`): componentes de servidor. Cada una enlaza a `/{_id}` y usa `card-lift` (sin sombra en reposo; en hover `translate(-3px,-3px)` + sombra dura). Las cards de professionals con estado `employed` se muestran con opacidad reducida.
- `ProfileView` (`ui/profile/profile-view.tsx`) renderiza el perfil estilo portada para `/me` y `/[id]` (recibe `user` y un `action` opcional). No tiene botón "Contact" y no muestra el email.
- `AuthLayout` (`ui/account/auth-layout.tsx`) es el marco de `/sign-in`, `/sign-up/professional` y `/sign-up/organization`: panel violeta con el título y formulario, en dos columnas iguales desde `lg`. Recibe `title`, `titleClassName` (tamaño del título por página, calculado para que la palabra más larga entre en el panel) y `aside`. La palabra destacada del título va en `text-yellow` (el accent sobre el violeta no tiene contraste suficiente). `/account` y `/sign-up` no usan `AuthLayout`: renderizan `NewHere` (`newHere.tsx`).
- `SearchFilters` (`ui/search/search-filters.tsx`) es un `next/form` con GET: los filtros viven en la URL y la página los lee de `searchParams` con `lib/search.ts`. Un filtro nuevo se agrega ahí, en `lib/search.ts` (con su test) y en el query de `read.ts`.
- Estilos: Tailwind 4 configurado en CSS: los tokens están en el bloque `@theme` de `globals.css`: colores `paper #F6F3EE` (fondo), `ink #111111` (texto y bordes), `yellow #FFD84D`, `error #D7263D`, `brand #6C63FF` y `accent #50D1B2`; sombras duras `shadow-hard`, `shadow-hard-brand` y `shadow-hard-lg`. Clases reutilizables en `globals.css`: `.display` (títulos: mayúsculas, peso 900, tracking -0.05em, una palabra en `text-brand`), `.label` (11px, mayúsculas, peso 800), `.card-lift`, `input-error`, `form-error` y `form-success`. Los estilos base de `input` (excepto checkbox y radio) y `textarea` también están ahí. Bordes de 2px `border-ink`, radios de 3–6px, nada de sombras difusas ni gradientes. Los CSS modules que usan `@apply` necesitan `@reference ".../globals.css";` al principio.
- **No usar símbolos decorativos** (↗ → ® ● ✦ y similares) en la UI. Solo se acepta un ícono mínimo con función (por ejemplo, cerrar el menú). Un título gigante (`.display`) tiene que entrar sin overflow ni cortes a mitad de palabra a 390px: calcular el ancho de la palabra más larga (~0.67em por letra) antes de elegir el tamaño.

## Estado actual / trabajo en curso
- La búsqueda y los filtros de los listados funcionan por URL (`?q=&specialty=&exp=&open=&area=`).
- `/inbox` es un placeholder.
- El footer enlaza a `/faqs`, `/terms-of-service`, `/privacy-policy` y `/cookies-policy`, que no existen.

## Reglas de seguridad y robustez (no romperlas)
- **Las server actions que modifican datos del usuario obtienen el `id` de `auth()`, nunca de un parámetro del cliente.** También comprueban `session.user.type`. Ejemplo: `professionalEditProfileFormAction` y `organizationEditProfileFormAction`.
- **El `password` nunca sale del servidor.** Los tipos `*WithColors` son `Omit<..., "password">` y los formatters no lo copian. Solo `getUserByEmail` (usado por `auth.ts`) devuelve el documento con el hash.
- **El email es único entre las dos colecciones.** Antes de crear una cuenta, el sign-up comprueba `isEmailTaken()` (en `actions.ts`), que consulta Professionals y Organizations.
- **`/[id]` captura cualquier ruta desconocida.** `getUserById` devuelve `null` si el id no es un ObjectId válido o no existe, y la página llama a `notFound()`, que muestra `src/app/not-found.tsx`. Por el `loading.tsx` de `(pages)` la respuesta se transmite en streaming y el status HTTP queda en 200 aunque se muestre el not-found.

## Pendientes
- No hay `error.tsx`: si falla la DB, se ve la página de error por defecto de Next.
