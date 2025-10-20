# Backend Coderhouse - Proyecto Carrito y Productos (2° Pre-Entrega)

Alumno: David Gallo  
Curso/Comisión: Backend - Comision #76570  
Proyecto: Proyecto Carrito y Productos — 2° Pre-Entrega (Websockets y Handlebars)

## Descripción
Servidor Node.js + Express para gestión de productos y carritos de compras. Persistencia en archivos JSON. Esta entrega incorpora Handlebars para vistas y Socket.IO para actualización en tiempo real de la vista `realtimeproducts`.

## Rutas de la API

### Productos (`/api/products`)
- GET `/api/products/` — Listar todos los productos
- GET `/api/products/:pid` — Obtener producto por ID
- POST `/api/products/` — Crear producto (body: datos del producto)
- PUT `/api/products/:pid` — Actualizar producto por ID
- DELETE `/api/products/:pid` — Eliminar producto por ID

### Carritos (`/api/carts`)
- POST `/api/carts/` — Crear carrito vacío
- GET `/api/carts/:cid` — Ver productos de un carrito
- POST `/api/carts/:cid/product/:pid` — Agregar producto al carrito (body: `{ "quantity": n }`)

### Vistas (Handlebars)
- GET `/` — home (lista server-side render de productos)
- GET `/realtimeproducts` — vista en tiempo real con Socket.IO (formulario para crear producto + botones eliminar)

# PRY_1_Coderhouse

Proyecto backend con Express, Handlebars, Socket.IO y MongoDB (Mongoose).

## Requisitos
- Node.js 18+ (probado en Node 22)
- MongoDB (local o Atlas)

## Variables de entorno
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

1. Clona el repo e instala dependencias:

```pwsh
npm install
```

2. Crea el `.env` en la raíz y valida `MONGO_URI` (ejemplo para Mongo local):

```pwsh
echo "MONGO_URI=mongodb://127.0.0.1:27017/ProyectoCoder" > .env
```

3. Sembrar la base de datos con productos (usa `src/data/products.json` actual):

```pwsh
npm run seed
```

4. Levantar en desarrollo:

```pwsh
npm run dev
```

5. Abrir en el navegador:

- Home: http://localhost:8080/
- Realtime: http://localhost:8080/realtimeproducts

## Troubleshooting rápido
- Si `npm run dev` falla con Exit Code 1: revisa que MongoDB esté corriendo y que `MONGO_URI` apunte correctamente. Mira la salida completa de la terminal para el stack trace.
- Si ves errores de CastError para ids, el proyecto valida que los ids sean ObjectId de Mongo; revisa que las peticiones usen `_id` devueltos por la API o el virtual `id`.

> Nota: los archivos JSON originales fueron archivados en `src/data/backup/` y los archivos en `src/data/` han sido neutralizados (arrays vacíos) para evitar confusión. El script de seed lee `src/data/products.json`.


## Postman
Incluyo una colección Postman (`postman_collection.json`) con las peticiones básicas (GET/POST/PUT/DELETE products y endpoints de carrito).

## Autor
David Gallo
