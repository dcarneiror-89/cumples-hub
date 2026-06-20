# Cumples HUB — Guía de Setup Completa

## Cuentas que necesitas crear (todas gratis)

| Servicio | URL | Para qué |
|----------|-----|---------|
| **Supabase** | supabase.com | Base de datos + Storage de fotos |
| **GitHub** | github.com | Repositorio del código |
| **Vercel** | vercel.com | Deploy (inicia sesión con GitHub, sin tarjeta) |

---

## Paso 1 — Supabase: crear proyecto y base de datos

1. Entra a [supabase.com](https://supabase.com) → **Start your project** → crea una cuenta.
2. Crea un nuevo proyecto:
   - Nombre: `cumples-hub` (o cualquiera)
   - Contraseña de la DB: guárdala, la necesitarás
   - Región: **South America (São Paulo)** — la más cercana a Chile
3. Espera ~1 minuto a que el proyecto se inicialice.
4. Ve a **SQL Editor** → **New Query**.
5. Pega el contenido completo de `schema.sql` y haz clic en **Run**.
   - Esto crea las tablas `personas`, `regalo_ideas`, `aportes`,
     el trigger automático de aportes, las políticas RLS y el bucket de fotos.
6. Ve a **Settings → API** y copia:
   - **Project URL** → empieza con `https://xxxx.supabase.co`
   - **anon public** key → el JWT largo

---

## Paso 2 — Configurar el proyecto localmente

Necesitas tener instalado [Node.js 18+](https://nodejs.org).

```bash
# Ubícate donde quieres guardar el proyecto
cd ~/Documents

# Copia la carpeta cumples-hub aquí o muévela a esta ubicación
# (la carpeta que te entregó Claude)

cd cumples-hub

# Instala dependencias
npm install

# Crea el archivo de variables de entorno
cp .env.local.example .env.local
```

Abre `.env.local` con cualquier editor y rellena con tus valores de Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

```bash
# Corre el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — deberías ver la app vacía y lista para agregar personas.

---

## Paso 3 — Importar datos existentes del equipo (opcional)

Tienes dos opciones para ingresar las 17 personas del equipo:

**Opción A — Desde la interfaz** (recomendada para probar):
Usa la pantalla "Gestionar Planilla" para agregar personas una por una.

**Opción B — SQL masivo** (más rápido):
En el `schema.sql` encontrarás un bloque comentado `/* INSERT INTO personas... */`.
Descomenta esas líneas en el **SQL Editor de Supabase** y ejecútalas.
Después podrás editar los aportes desde la interfaz.

---

## Paso 4 — Subir a GitHub

```bash
# Dentro de la carpeta cumples-hub:
git init
git add .
git commit -m "feat: cumples hub con supabase"
```

1. Ve a [github.com](https://github.com) → **New repository**
2. Nombre: `cumples-hub`, visibilidad: **Private** (recomendado)
3. **No** inicialices con README (ya tienes archivos)
4. Copia los comandos que GitHub te muestra para "push an existing repository":

```bash
git remote add origin https://github.com/TU_USUARIO/cumples-hub.git
git branch -M main
git push -u origin main
```

> **Importante:** El archivo `.env.local` está en `.gitignore` automáticamente en Next.js, así que las claves de Supabase NO se subirán a GitHub.

---

## Paso 5 — Deploy en Vercel

1. Ve a [vercel.com](https://vercel.com) → **Sign up with GitHub**
2. Clic en **Add New → Project**
3. Selecciona el repositorio `cumples-hub`
4. En la sección **Environment Variables**, agrega las dos variables:
   - `NEXT_PUBLIC_SUPABASE_URL` → tu URL de Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → tu anon key
5. Clic en **Deploy** — Vercel construirá y publicará la app automáticamente.

En ~2 minutos tendrás una URL pública tipo:
`https://cumples-hub-XXXX.vercel.app`

---

## Flujo de actualización futuro

Cada vez que hagas cambios locales:

```bash
git add .
git commit -m "descripción del cambio"
git push
```

Vercel detecta el push y redeploya automáticamente.

---

## Estructura del proyecto

```
cumples-hub/
├── app/
│   ├── layout.tsx          # HTML base y metadata
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales + animaciones
├── components/
│   └── BirthdayApp.tsx     # Toda la UI (adaptada de tu componente original)
├── lib/
│   ├── supabase.ts         # Cliente Supabase
│   └── db.ts               # Funciones CRUD (personas, aportes, fotos)
├── types/
│   └── index.ts            # Tipos TypeScript
├── schema.sql              # SQL para ejecutar en Supabase
├── .env.local.example      # Plantilla de variables de entorno
└── SETUP.md                # Esta guía
```

---

## Modelo de datos en Supabase

```
personas
  id · nombre · dia · mes · signo · emoji_signo · color · foto_url · telefono

regalo_ideas
  id · persona_id (FK) · descripcion · enlace · orden

aportes
  id · aportante_id (FK) · cumpleanero_id (FK) · pagado · created_at
  — UNIQUE(aportante_id, cumpleanero_id)
  — TRIGGER: al insertar persona, se crean todos los pares automáticamente
```

---

## Preguntas frecuentes

**¿La app requiere login?**
No. Cualquier persona con la URL puede ver y editar. Es ideal para equipos internos pequeños. Si quieres agregar autenticación más adelante, Supabase tiene Auth integrado.

**¿Se pueden perder los datos?**
No, mientras el proyecto esté activo en Supabase (plan gratuito = indefinido mientras uses la app). Supabase hace backups automáticos.

**¿Qué pasa si supero el límite del plan gratuito?**
El plan gratuito de Supabase incluye 500 MB de DB y 1 GB de Storage — suficiente para cientos de personas y fotos. Vercel gratuito incluye 100 GB de bandwidth mensual.

**¿Cómo agrego a WhatsApp después?**
Cuando estés listo, la integración más simple es agregar un botón que abra `https://wa.me/56912345678?text=Hola!` usando el campo `telefono` que ya está en la DB.
