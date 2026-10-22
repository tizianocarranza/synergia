# CLAUDE.md

Guía para trabajar en **Synergia**: una web que conecta *professionals* (desarrolladores) con *organizations* (empresas que buscan talento). La UI está en inglés; los comentarios del código mezclan español e inglés (se acepta cualquiera de los dos).

## Comandos

Gestor de paquetes: **pnpm** (hay `pnpm-lock.yaml`).

```bash
pnpm install
pnpm dev      # next dev, http://localhost:3000
pnpm build    # next build (también hace type-check)
pnpm lint     # eslint . (flat config en eslint.config.mjs, extiende eslint-config-next/core-web-vitals)
```

No hay tests. Para verificar un cambio: `pnpm lint`, `pnpm build` y probarlo en el navegador.

- `bcrypt` (v6) trae binarios precompilados y se carga con `node-gyp-build`. Igual, `package.json` mantiene `pnpm.onlyBuiltDependencies` para que pnpm 10 ejecute su script de install.

## Variables de entorno

Copiar `.env.example` a `.env`:

- `MONGO_URL`: connection string de MongoDB (se usa en `src/app/lib/config/db.js`).
- `AUTH_SECRET`: secreto de next-auth para cifrar el JWT (`npx auth secret`).

## Stack

- Next `16` (App Router, carpeta `src/`, Turbopack), React `19`, next-auth `5.0.0-beta.32` (v5 sigue en beta), TypeScript 6.
- Mongoose 9, Zod 4, bcrypt 6, Tailwind 4, ESLint 9, `clsx`, `react-responsive`.
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
- `lib/data/read.ts` (`"use server"`): `getAll*`, `get*ById`, `getUserById` (devuelve `{ formattedProfessional, formattedOrganization }`, uno de los dos es null) y `getUserByEmail`. Los errores se loguean y se relanzan con un mensaje genérico.
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
  layout.tsx            Navbar fija + <main> + Footer, fuente Epilogue local
  page.tsx              Home (Hero)
  (pages)/
    loading.tsx         Loader animado
    about/  inbox/      inbox es un placeholder
    (look-for)/professionals, opportunities   listados de cards (LookForPage)
    (account)/account, sign-in, sign-up/{professional,organization}
    (account)/(profile)/me     perfil propio con modal de edición
    (account)/(profile)/[id]   perfil público por _id (professional u organization)
  ui/                   componentes por dominio (account, buttons, cards, navbar, pages, ...)
```
- Para páginas nuevas, usar los contenedores de `ui/pages/pages.tsx`: `MainPage` (header y texto opcionales) o `LookForPage` (header, buscador/filtros y grid de cards de 384px).
- Botones: `LinkButton` (navegación) y `PrimaryButton` (con `action` y `type`) en `ui/buttons/buttons.tsx`.
- Cards (`ui/cards/*`): componentes cliente. Cada una enlaza a `/{_id}`. En desktop (≥1024px, con `useMediaQuery`) se expanden al hacer hover para mostrar la descripción. Imágenes de respaldo: `/avatar.svg` y `/building.svg`. Las cards de professionals con estado `employed` se muestran con opacidad reducida.
- Estilos: Tailwind 4 configurado en CSS: los tokens están en el bloque `@theme` de `globals.css` (`brand #6C63FF`, `accent #50D1B2`, tamaños `15xl`, `big`, etc.). Las clases reutilizables están en `globals.css` (`main-page-header`, `alternative-main-page-header`, `hover-underline(-white)`, `input-error`, `form-error`, `form-success`, `scroll-y-container`). Los estilos base de `input` y `textarea` también están ahí. Los CSS modules que usan `@apply` necesitan `@reference ".../globals.css";` al principio.

## Estado actual / trabajo en curso
- La búsqueda y los filtros de `LookForPage` son solo UI estática: todavía no filtran nada (último commit: "search UI first stage").
- `/inbox` es un placeholder. `Testimonials` y el menú mobile están comentados.
- El footer enlaza a `/faqs`, `/terms-of-service`, `/privacy-policy` y `/cookies-policy`, que no existen.

## Reglas de seguridad y robustez (no romperlas)
- **Las server actions que modifican datos del usuario obtienen el `id` de `auth()`, nunca de un parámetro del cliente.** También comprueban `session.user.type`. Ejemplo: `professionalEditProfileFormAction` y `organizationEditProfileFormAction`.
- **El `password` nunca sale del servidor.** Los tipos `*WithColors` son `Omit<..., "password">` y los formatters no lo copian. Solo `getUserByEmail` (usado por `auth.ts`) devuelve el documento con el hash.
- **El email es único entre las dos colecciones.** Antes de crear una cuenta, el sign-up comprueba `isEmailTaken()` (en `actions.ts`), que consulta Professionals y Organizations.
- **`/[id]` captura cualquier ruta desconocida.** `getUserById` devuelve `null` si el id no es un ObjectId válido o no existe, y la página llama a `notFound()`, que muestra `src/app/not-found.tsx`. Por el `loading.tsx` de `(pages)` la respuesta se transmite en streaming y el status HTTP queda en 200 aunque se muestre el not-found.

## Pendientes
- No hay `error.tsx`: si falla la DB, se ve la página de error por defecto de Next.
