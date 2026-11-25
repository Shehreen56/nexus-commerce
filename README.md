# NEXUS-COMMERCE

A full-stack e-commerce web application developed for the **Beyond Prompting Bootcamp**.

## 1. Project Overview

NEXUS-COMMERCE is an online shopping application that allows customers to browse products, search and filter the catalog, manage a shopping cart, and place Cash on Delivery orders. It also provides an administrative dashboard for managing customers, orders, and inventory.

## 2. Features

### Customer Features
- Responsive homepage and product catalog
- 45 products with images and prices
- Product search and category filtering
- Product details
- Shopping cart with quantity controls
- Automatic subtotal and total calculation
- Cash on Delivery checkout
- Order confirmation

### Admin Features
- Admin login using JWT authentication
- Dashboard statistics
- Customer directory
- Order management
- Order status updates
- Inventory management

## 3. Technology Stack

| Component | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Node.js, Express.js |
| Database | SQLite using sql.js |
| Authentication | JSON Web Token (JWT) |
| Password Security | bcryptjs |

## 4. Project Structure

```text
nexus-commerce/
├── docs/
│   ├── AI_PROMPT_DOCUMENTATION.md
│   ├── CONTEXT_ENGINEERING.md
│   ├── TESTING_REPORT.md
│   └── screenshots/
├── public/
├── server/
│   ├── database.cjs
│   └── server.cjs
├── src/
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## 5. Requirements

- Node.js and npm
- A modern web browser
- Git (optional, for cloning the repository)

## 6. Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Shehreen56/nexus-commerce.git
cd nexus-commerce
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the actual GitHub repository URL.

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the project root.

Use `.env.example` as a reference and configure these variables:

```env
PORT=5000
JWT_SECRET=your_long_random_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_strong_admin_password
VITE_API_URL=http://localhost:5000/api
```

Do not share or commit your actual `.env` file, administrator password, or JWT secret.

### Step 4: Start the Backend

Open a terminal in the project directory:

```bash
npm run server
```

The backend uses port `5000` by default unless another port is configured.

### Step 5: Start the Frontend

Open a second terminal in the project directory:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

### Step 6: Build the Frontend

```bash
npm run build
```

The production build is generated in the `dist/` directory.

## 7. Available Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the frontend development server |
| `npm run server` | Start the backend server |
| `npm run build` | Create the production frontend build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint code checks |

## 8. Database

The application uses SQLite through `sql.js`.

By default, the database is stored at:

```text
server/database.sqlite
```

An optional `DB_PATH` environment variable can specify a different database location.

The database initializes the required tables and inventory for 45 products.

## 9. Testing

Manual functional testing was performed for the following areas:

- Homepage and product images
- Product search and category filtering
- Product details and pricing
- Shopping cart and quantity controls
- Checkout and order confirmation
- Inventory updates
- Admin authentication
- Protected API access
- Customer directory
- Order management and status updates
- Dashboard statistics

See `docs/TESTING_REPORT.md` for the test results.

## 10. Documentation and Screenshots

- `docs/AI_PROMPT_DOCUMENTATION.md` — AI-assisted development prompts and verification.
- `docs/CONTEXT_ENGINEERING.md` — Project context and iterative development evidence.
- `docs/TESTING_REPORT.md` — Functional testing results.
- `docs/screenshots/` — Application screenshots.

## 11. Security and Privacy

- Sensitive configuration is stored in environment variables.
- Administrator routes require authentication.
- Checkout prices are validated by the backend.
- Demo customer data is anonymized.
- Environment files, database files, and private backups are excluded from Git.

## 12. Project Information

**Project:** NEXUS-COMMERCE
**Category:** Full-Stack E-Commerce Application
**Purpose:** Educational project for Beyond Prompting Bootcamp

## 13. License

Developed for educational purposes.
