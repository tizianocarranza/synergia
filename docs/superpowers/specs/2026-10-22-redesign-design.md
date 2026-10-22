# Synergia: redesign completo, dirección "Editorial bold"

Fecha: 2026-10-22 · Rama: `feat/redesign` (parte de `chore/upgrade-stack`) · Mockup aprobado: `2026-10-22-redesign-mockup.html` (en esta carpeta).

## Intención

Synergia conecta *professionals* (desarrolladores) con *organizations*. La UI actual funciona, pero es genérica: fondo blanco, layout centrado, una ilustración de stock, cards sueltas. El autor quiere un redesign completo e impresionante de **toda** la app, con personalidad propia, que **no parezca hecho por IA ni sacado de una plantilla**.

Se exploraron tres direcciones (dark/glow, editorial bold y soft/friendly) y el autor eligió la **editorial bold**. Después vio una versión "más sobria y editorial" y la descartó explícitamente: pidió volver a la versión audaz y solo sacarle los símbolos decorativos. **La referencia es el mockup aprobado, no una versión "más refinada" de él.**

## Objetivos

- Rediseñar todas las páginas con un lenguaje visual único y coherente: home, about, professionals, opportunities, account, sign-in, sign-up (las tres), me, `/[id]`, inbox, not-found y loading, además de navbar y footer.
- Que funcione lo que hoy es solo fachada:
  - **Buscador y filtros** de `/professionals` y `/opportunities`.
  - **Menú mobile** real (hoy está comentado).
- Mobile y desktop cuidados por igual.

## No-objetivos

- Mensajería real: `/inbox` queda como placeholder, con el diseño nuevo.
- Cambios de autenticación, de modelos de datos o de reglas de seguridad (ver CLAUDE.md, "Reglas de seguridad"); se mantienen tal cual.
- Crear las páginas legales y de FAQs que hoy enlaza el footer. Los links pueden quedar, pero no hay que crearlas.
- Cambiar el nombre, el logo o los colores de marca.

## Anti-objetivos (aunque funcione, sería un fracaso)

- Que se vea "AI-generated". Lo que el autor marcó como señal: flechas decorativas (↗ →), ®, ●, ✦ y símbolos de relleno en general. **No usarlos en ningún lado.** Si la acción necesita un ícono funcional (cerrar menú, quitar un filtro), se acepta uno mínimo.
- "Suavizarlo": pasar a sombras difusas, esquinas muy redondeadas, gradientes o glassmorphism. Tampoco quitar las mayúsculas gigantes, las sombras duras o el amarillo por criterio propio; el autor ya rechazó esa versión.
- Romper la accesibilidad de los formularios. El patrón de `aria-describedby` y `aria-live` de CLAUDE.md se mantiene.

## Lenguaje visual (decidido con el autor, ver el mockup)

- **Fondo** crema cálido `#F6F3EE`; **tinta** `#111`.
- **Colores:** brand `#6C63FF` (violeta) y accent `#50D1B2` (turquesa) como bloques sólidos de color. Un tercer color, **amarillo `#FFD84D`**, para tiles y para el menú mobile.
- **Bordes negros de 2px** en cards, inputs, botones, tiles y tags. Esquinas casi rectas (3–6px). El autor pidió explícitamente conservarlos.
- **Sombras duras** sin blur, con offset de 4px (negra o violeta), en botones primarios, el buscador y los inputs enfocados. Las cards no tienen sombra en reposo: **al hacer hover se levantan** (`translate(-3px,-3px)` + sombra dura). El autor también pidió conservar esto.
- **Tipografía:** Epilogue (ya está local en `public/fonts/epilogue`, variable). Los títulos principales van gigantes, en **mayúsculas**, peso 900 y tracking muy negativo (`-.05em`), con una palabra destacada en violeta. Labels chicos en mayúsculas y peso 800. El texto de cuerpo va normal.
- **Tags** rectos, en mayúsculas, con borde negro. Si están activos, fondo de color.
- **Banda negra** con specialties y áreas en mayúsculas, separadas solo por espacio, sin ✦. Es estática: no hace falta animarla.
- Los colores por specialty y por área ya existen en `src/app/lib/types/general.ts` (`specialtyColors`, `areaColors`). Se usan para la franja superior de cada card y para la portada del perfil.

## Páginas

1. **Navbar** (desktop):
   - Wordmark `SYNERGIA`, links centrales (Home, Professionals, Opportunities, About; también Inbox si hay sesión) y, a la derecha, Sign in o el nombre del usuario con Sign out.
   - Línea inferior de 2px. El link activo va subrayado grueso.
2. **Menú mobile:** pantalla completa amarilla, con los links gigantes en mayúsculas, el activo en violeta, un botón Sign in/Sign out y un control de cierre. Se cierra al navegar.
3. **Home:**
   - Hero gigante "BRINGING *TALENT* TOGETHER." con un texto breve y dos botones.
   - Bento asimétrico:
     - tile violeta alto "I want to hire" con la cantidad de professionals open to work;
     - tile turquesa "I want a team" con la cantidad de organizations;
     - tile amarillo con la specialty más común;
     - tile ancho con un professional destacado.
   - Después, la banda negra y el footer.
   - **Los números salen de la DB, no son de relleno.**
4. **Footer:** bloque violeta con el wordmark enorme, links y "Developed by Tiziano Carranza".
5. **Listados** (`/professionals` y `/opportunities`, el mismo componente):
   - Título gigante con la cantidad de resultados al lado.
   - Buscador grande con sombra dura y botón Search.
   - Fila de tags-filtro y grilla de cards.
   - Cards de professional:
     - franja de color según la specialty, avatar, nombre, specialty con los años, descripción y tag de estado;
     - si su `employmentStatus` es `employed`, la card va atenuada.
   - Las cards de organization siguen el mismo esquema, con el color del área y el website si existe.
6. **Perfil `/[id]`:**
   - Portada del color de la specialty o del área, con avatar grande con sombra dura y el nombre gigante en dos líneas.
   - Debajo, tiles con los datos (experiencia, estado y descripción; en organizations, área y website).
   - **Sin botón "Contact"** (decisión del autor): no se muestra el email y no hay acción de contacto hasta que exista el inbox. El mockup tiene uno; ese elemento se ignora.
7. **`/me`:**
   - El mismo layout del perfil público, más el botón "Edit profile", que abre el formulario de edición (rediseñado) en un overlay.
   - Se mantiene la lógica actual de `ui/account/profile-forms.tsx`.
8. **Sign in:**
   - Split: panel violeta con "WELCOME BACK." y link a sign-up; formulario con inputs gruesos.
   - Los errores van debajo de cada input en rojo.
9. **Account y sign-up:**
   - `/account` muestra dos bloques grandes de color para elegir "I'm a professional" o "I represent an organization", más el link a sign in.
   - Los formularios de sign-up siguen el estilo del sign-in. Son largos, así que pueden ir en una columna con el panel de color fijo al costado en desktop.
10. **About:** página editorial con el título gigante y el texto actual reorganizado en bloques. El copy se puede pulir manteniendo el contenido.
11. **Inbox:** placeholder con el diseño nuevo ("Inbox is coming soon").
12. **Not-found y loading:** con el lenguaje nuevo. El loader actual (grid de puntos) se puede adaptar o reemplazar.

## Búsqueda y filtros (comportamiento)

- El estado vive en la **URL** (`searchParams`), así una búsqueda se puede compartir y funciona el botón "atrás". El filtrado se hace **en el servidor**, con la query de Mongo armada en `lib/data/read.ts`. En Next 16, `searchParams` es una Promise.
- **Professionals:** texto libre (sobre nombre y descripción, sin distinguir mayúsculas), specialty, rango de experiencia y "solo open to work".
- **Opportunities:** texto libre (nombre y descripción) y área.
- Los valores de specialty y área se validan contra los enums de `general.ts`; los valores inválidos se ignoran.
- Se muestran "N resultados" y un estado vacío con diseño propio y un link para limpiar los filtros.

## Restricciones

- Stack de la rama base: Next 16, React 19, Tailwind 4 (tokens en `@theme` de `globals.css`), Zod 4 y Mongoose 9. Seguir las convenciones de CLAUDE.md (formularios, `*WithColors`, `dbConnect`, la seguridad de las server actions y el password que nunca sale del servidor).
- Reutilizar lo existente:
  - `MainPage`/`LookForPage` (`ui/pages/pages.tsx`), `LinkButton`/`PrimaryButton` (`ui/buttons/buttons.tsx`) y los formatters de `lib/utils.ts`;
  - si un componente cambia mucho, se rediseña en su lugar en vez de duplicarlo.
- `react-responsive` (`useMediaQuery`) existe hoy. Para lo responsive, preferir CSS (breakpoints de Tailwind) antes que JS.
- Las imágenes de respaldo actuales son `/avatar.svg` y `/building.svg`. El estilo nuevo pide avatares con borde negro.
- Verificar con `pnpm lint` y `pnpm build`, y probar en el navegador en desktop y mobile.

## Decisiones mías (el autor puede revisarlas)

- **Números de la home:**
  - professionals con `employmentStatus: "unemployed"`;
  - total de organizations;
  - specialty con más professionals;
  - professional destacado: el más reciente que esté open to work.
- **Filtros en la URL** y filtrado en el servidor, como se describe arriba.
- **Filtro de specialty y área: una sola opción a la vez** (`?specialty=React`, `$eq` en Mongo).
  - La fila de tags muestra "All" y las ~6 specialties (o áreas) más comunes en la DB.
  - Un tag "More" despliega la lista completa (55 specialties) en un panel con el mismo estilo de bordes.
  - En mobile, la fila hace scroll horizontal.
- **Avatar:** se muestra `image` si existe y, si no, las iniciales del nombre en un cuadrado con borde (en lugar del svg genérico).
- **Rojo de error** `#D7263D`, que no es un color de marca.
- **Navegación:** los links se llaman "Professionals" y "Opportunities", como las rutas existentes. En el mockup decían "Talent"; se alinean con las rutas.

## Lo que queda a criterio del builder

- Estructura interna de los componentes, nombres y cómo se reparten entre cliente y servidor.
- Animaciones de entrada y transiciones (sutiles, que acompañen el estilo), los breakpoints exactos y las escalas tipográficas en mobile.
- Paginación de los listados: hoy no la hay; es opcional.
- Copy de detalle, en inglés, concreto y sin frases genéricas de landing.
