# JV Studio Web

Proyecto full-stack para captar clientes de páginas web.

## Stack

- Next.js App Router
- React
- Backend API en `app/api/leads`
- Firebase Admin + Firestore para guardar leads
- Deploy preparado para Vercel

## Ejecutar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`.

## Configurar Firebase

1. Entra a Firebase Console y crea un proyecto.
2. Activa Firestore Database.
3. Ve a `Project settings > Service accounts`.
4. Genera una nueva private key.
5. Copia estos valores en `.env.local` y en Vercel:

```bash
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

La API guardará los leads en la colección `leads`.

## Subir a GitHub

```bash
git init
git add .
git commit -m "Create JV Studio full-stack website"
git branch -M main
git remote add origin https://github.com/juanesvivero/jv-studio-web.git
git push -u origin main
```

## Deploy en Vercel

1. Entra a https://vercel.com/.
2. Importa el repositorio desde GitHub.
3. Agrega las variables de entorno del archivo `.env.example`.
4. Deploy.

## Variables necesarias en Vercel

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

## Personalización rápida

- Cambia textos en `app/page.tsx`.
- Cambia estilos en `app/globals.css`.
- Cambia lógica de leads en `app/api/leads/route.ts`.
