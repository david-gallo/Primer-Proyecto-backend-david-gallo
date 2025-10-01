# Backend Coderhouse - Proyecto Carrito y Productos

## Descripción
Servidor Node.js + Express para gestión de productos y carritos de compras. Persistencia en archivos JSON.

## Rutas de la API

### Productos (`/api/products`)
- **GET** `/api/products/` — Listar todos los productos
- **GET** `/api/products/:pid` — Obtener producto por ID
- **POST** `/api/products/` — Crear producto (body: datos del producto)
- **PUT** `/api/products/:pid` — Actualizar producto por ID
- **DELETE** `/api/products/:pid` — Eliminar producto por ID

### Carritos (`/api/carts`)
- **POST** `/api/carts/` — Crear carrito vacío
- **GET** `/api/carts/:cid` — Ver productos de un carrito
- **POST** `/api/carts/:cid/product/:pid` — Agregar producto al carrito (body: `{ "quantity": n }`)

## Ejemplos de uso en Postman

**Crear producto**
```json
POST /api/products/
{
  "title": "arroz",
  "description": "arroz blanco",
  "code": "ARZ001",
  "price": 30,
  "status": true,
  "stock": 100,
  "category": "alimentos",
  "thumbnails": ["ruta/imagen1.jpg"]
}
```

**Crear carrito**
```
POST /api/carts/
```

**Agregar producto al carrito**
```json
POST /api/carts/1/product/2
{
  "quantity": 3
}
```

**Ver productos de un carrito**
```
GET /api/carts/1
```

## Cómo ejecutar
1. Instala dependencias:  
   `npm install`
2. Ejecuta el servidor:  
   `nodemon src/app.js`  
   o  
   `node src/app.js`

## Requisitos
- Node.js
- Express

## Autor
David gallo comision #76570