# Backend Coderhouse - Proyecto Carrito y Productos (2° Pre-Entrega)

Alumno: David Gallo  
Curso/Comisión: Backend - Comision #76570  
Proyecto: Proyecto Carrito y Productos — 2° Pre-Entrega (Websockets y Handlebars)


## Rutas de la API

- GET `/api/products/` — Listar todos los productos
- GET `/api/products/:pid` — Obtener producto por ID

### Carritos (`/api/carts`)
- GET `/` — home (lista server-side render de productos)

Proyecto backend con Express, Handlebars, Socket.IO y MongoDB (Mongoose).
- Node.js 18+ (probado en Node 22)
- MongoDB (local o Atlas)
Crea un archivo `.env` en la raíz con:

MONGO_URI=mongodb://127.0.0.1:27017/ProyectoCoder

## Scripts útiles
- `npm run seed` — inserta los productos de `src/data/backup/products.json` en la colección `products`.
- `npm run dev` — arranca el servidor con nodemon.
- `npm start` — arranca el servidor con node.

## Rutas principales
- GET /api/products
- GET /api/products/:pid
- POST /api/products
- PUT /api/products/:pid
- DELETE /api/products/:pid

- POST /api/carts
- GET /api/carts/:cid
- POST /api/carts/:cid/product/:pid

## Vistas
- GET / → `home.handlebars` (servidor render)
- GET /realtimeproducts → `realTimeProducts.handlebars` (websockets)

## Notas
- Los modelos usan Mongoose; los managers retornan objetos con `id` virtual y `_id`.
- Archivé los archivos JSON antiguos en `src/data/backup/` para referencia.

## Pasos para levantar el proyecto (rápido)

```pwsh

2. Crea el `.env` en la raíz y valida `MONGO_URI` (ejemplo para Mongo local):

```pwsh
echo "MONGO_URI=mongodb://127.0.0.1:27017/ProyectoCoder" > .env
```

3. Sembrar la base de datos con productos (usa `src/data/products.json` actual):

# Proyecto Backend - Carrito y Productos

Servidor Node.js con Express, Mongoose, Handlebars y Socket.IO para gestionar productos y carritos.

Requisitos
- Node.js 18+
- MongoDB (local o Atlas)

Instalación rápida
1. Instalar dependencias:

```pwsh
npm install
```

2. Crear `.env` copiando `.env.example` y completar `MONGO_URI`.

3. (Opcional) Sembrar la base de datos:

```pwsh
npm run seed
```

4. Levantar la aplicación:

```pwsh
npm run dev
```

URLs útiles
- Home: http://localhost:8080/
- Realtime: http://localhost:8080/realtimeproducts

Comandos
- `npm run seed` — insertar productos
- `npm run dev` — arrancar en desarrollo
- `npm test` — ejecutar pruebas

Rutas principales (resumen)
- Productos: `/api/products` (GET/POST/PUT/DELETE)
- Carritos: `/api/carts` (crear, ver, agregar producto, actualizar cantidad, vaciar)

Archivos clave
- `src/models/`, `src/managers/`, `src/routes/`, `src/views/`, `src/scripts/`

Incluye `postman_collection.json` con peticiones básicas.

Autor: David Gallo
