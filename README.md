<p align="center">
  <img src="https://i.postimg.cc/C5RjqDD1/Chat-GPT-Image-Aug-13-2025-05-18-25-PM.png" alt="Inventory App Banner" width="900" />
</p>

<div align="center">

## Inventory App (Express + PostgreSQL + EJS)

A minimal inventory management app built to learn Express and PostgreSQL for The
Odin Project.

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-black?logo=express&logoColor=white)](https://expressjs.com/)
[![EJS](https://img.shields.io/badge/EJS-Templates-8BC34A)](https://ejs.co/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Local%20or%20Hosted-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![express-validator](https://img.shields.io/badge/express--validator-Validation-4B8BBE)](https://express-validator.github.io/)
[![method-override](https://img.shields.io/badge/method--override-Forms%20PUT%2FDELETE-7952B3)](https://www.npmjs.com/package/method-override)
[![pg](https://img.shields.io/badge/pg-Client-336791)](https://www.npmjs.com/package/pg)

</div>

---

## Table of Contents

- [About](#about)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Routes](#routes)
- [Database schema](#database-schema)
- [Validation](#validation)
- [Development notes](#development-notes)

---

## About

This app manages products, sales, and suppliers. It demonstrates server-rendered
CRUD with Express, EJS views, input validation, and a PostgreSQL database.

- Assignment:
  [The Odin Project — NodeJS: Inventory Application](https://www.theodinproject.com/lessons/node-path-nodejs-inventory-application)

Hosting: The backend and PostgreSQL database are deployed on Railway.

### Features

- Products: list, create, update, delete
- Sales: list, create, update, delete (linked to products)
- Suppliers: list, create, update, delete
- EJS templates with a base layout
- Form validation and error display
- Method override to support PUT/DELETE from HTML forms

## Requirements

- Node.js 20+
- npm
- PostgreSQL (local or hosted)

## Quick start

```bash
# 1) Install dependencies
npm install

# 2) Create .env (see example below)

# 3) Initialize database tables
node db/createTables.mjs

# 4) (Optional) Seed example data
node db/populateTables.mjs

# 5) Start the dev server
npm run dev
# Server: http://localhost:3080
```

Navigate to `/` for the home page, then `/products`, `/sales`, or `/suppliers`.

## Environment variables

Create a `.env` file in the project root:

```env
# Server
PORT=3080
NODE_ENV=development

# Database — PostgreSQL connection string
# Example (adjust to your setup)
DATABASE_PUBLIC_URL=postgresql://USER:PASSWORD@localhost:5432/inventory_app
```

Notes:

- The app currently reads `DATABASE_PUBLIC_URL` and enables SSL in the DB
  client. For local Postgres without SSL, you can adapt `db/pool.mjs` (there is
  a commented local `Pool` config) or ensure your connection string sets
  `sslmode=disable` depending on your environment.

## Scripts

- `npm start` — start server
- `npm run dev` — start with Node’s watch mode
- `node db/createTables.mjs` — create tables
- `node db/populateTables.mjs` — insert sample data

## Tech stack

- **Backend:** Node.js, Express, EJS, express-ejs-layouts
- **Database:** PostgreSQL via `pg`
- **Validation:** `express-validator`
- **HTTP forms:** `method-override` for PUT/DELETE
- **Async controllers:** `express-async-handler`
- **Env:** `dotenv`

## Project structure

```
.
├─ app.mjs
├─ config.mjs
├─ controllers/
│  ├─ productsController.mjs
│  ├─ salesController.mjs
│  └─ suppliersController.mjs
├─ db/
│  ├─ createTables.mjs
│  ├─ populateTables.mjs
│  ├─ pool.mjs
│  ├─ productsQueries.mjs
│  ├─ salesQueries.mjs
│  └─ suppliersQueries.mjs
├─ public/
│  └─ css/styles.css
├─ routes/
│  ├─ homeRouter.mjs
│  ├─ productsRouter.mjs
│  ├─ salesRouter.mjs
│  └─ suppliersRouter.mjs
├─ validations/
│  ├─ productValidation.mjs
│  ├─ saleValidation.mjs
│  └─ supplierValidation.mjs
└─ views/
   ├─ layout.ejs
   ├─ home.ejs
   ├─ products.ejs
   ├─ productEdit.ejs
   ├─ sales.ejs
   ├─ saleEdit.ejs
   ├─ suppliers.ejs
   ├─ supplierEdit.ejs
   └─ 404.ejs
```

## Routes

- **Home**
  - `GET /` — render home page
- **Products**
  - `GET /products` — list products
  - `GET /products/:id` — edit/view one product
  - `POST /products` — create product
  - `PUT /products/:id` — update product
  - `DELETE /products/:id` — delete product
- **Sales**
  - `GET /sales` — list sales
  - `GET /sales/:id` — edit/view one sale
  - `POST /sales` — create sale
  - `PUT /sales/:id` — update sale
  - `DELETE /sales/:id` — delete sale
- **Suppliers**
  - `GET /suppliers` — list suppliers
  - `GET /suppliers/:id` — edit/view one supplier
  - `POST /suppliers` — create supplier
  - `PUT /suppliers/:id` — update supplier
  - `DELETE /suppliers/:id` — delete supplier

Forms use a hidden `_method` field (via `method-override`) to submit PUT and
DELETE requests from standard HTML forms.

## Database schema

Tables are created by `db/createTables.mjs`:

```sql
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  price DECIMAL(10,2),
  quantity INT
);

CREATE TABLE IF NOT EXISTS sales (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  quantity_sold INT,
  total_sale DECIMAL(10,2),
  product_id INTEGER,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(255)
);
```

Sample data can be inserted with `db/populateTables.mjs`.

## Validation

Server-side validation is implemented with `express-validator`:

- Products: non-empty name, non-negative price, positive quantity
- Sales: valid `product_id`, positive `quantity_sold`, non-negative `total_sale`
- Suppliers: non-empty string name/phone, valid email, basic phone format check

Validation errors are rendered back into the relevant views with the entered
form data where applicable.

## Development notes

- Views are rendered with EJS and `express-ejs-layouts` using the base layout
  `views/layout.ejs`.
- Static assets are served from `public/`.
- Errors fall back to `views/errors.ejs` or JSON depending on `Accept` headers.
- For hosted Postgres providers that require SSL, the default pool enables SSL.
  For local development without SSL, adjust the pool config as needed.
