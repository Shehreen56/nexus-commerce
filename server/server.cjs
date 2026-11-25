const PORT = process.env.PORT || 5000;

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const {
  initializeDatabase,
  getDatabase,
  getAll,
  getOne,
  run,
  saveDatabase
} = require("./database.cjs");

const verifyAdmin = require("./auth.cjs");

const PRODUCT_PRICES = {
  1: 8500,
  2: 9200,
  3: 6500,
  4: 7800,
  5: 11500,
  6: 7200,
  7: 8900,
  8: 9800,
  9: 4200,
  10: 3900,
  11: 4500,
  12: 4800,
  13: 5200,
  14: 4300,
  15: 3500,
  16: 4100,
  17: 4600,
  18: 3800,
  19: 4200,
  20: 3900,
  21: 4500,
  22: 4300,
  23: 3600,
  24: 3700,
  25: 4400,
  26: 1800,
  27: 3200,
  28: 3500,
  29: 3000,
  30: 3400,
  31: 3300,
  32: 2200,
  33: 1900,
  34: 2500,
  35: 2400,
  36: 6200,
  37: 5500,
  38: 5800,
  39: 6500,
  40: 5900,
  41: 6100,
  42: 5700,
  43: 6300,
  44: 6000,
  45: 6400
};

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());


if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
  throw new Error("Missing required admin or JWT environment variables.");
}

app.get("/api/health", (req, res) => {
  res.json({
    message: "NEXUS-COMMERCE backend is running."
  });
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const token = jwt.sign(
      {
        email,
        role: "admin"
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      message: "Login successful.",
      token
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed." });
  }
});


  // Get stock for all products
  app.get("/api/inventory", (req, res) => {
    try {
      const inventory = getAll(
        "SELECT product_id, stock FROM inventory ORDER BY product_id"
      );

      res.json(inventory);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Could not load inventory."
      });
    }
  });

  // Admin can update product stock
  app.patch("/api/inventory/:productId", verifyAdmin, (req, res) => {
    try {
      const productId = Number(req.params.productId);
      const stock = Number(req.body.stock);

      if (
        !Number.isInteger(productId) ||
        productId < 1 ||
        productId > 45 ||
        !Number.isInteger(stock) ||
        stock < 0 ||
        stock > 999
      ) {
        return res.status(400).json({
          message: "Please provide a valid product ID and stock (0–999)."
        });
      }

      const product = getOne(
        "SELECT product_id FROM inventory WHERE product_id = ?",
        [productId]
      );

      if (!product) {
        return res.status(404).json({
          message: "Product inventory not found."
        });
      }

      run(
        "UPDATE inventory SET stock = ? WHERE product_id = ?",
        [stock, productId]
      );

      res.json({
        message: "Stock updated successfully.",
        productId,
        stock
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Could not update stock."
      });
    }
  });

app.post("/api/orders", (req, res) => {
  const database = getDatabase();
  let transactionStarted = false;

  try {
    const {
      customerName,
      name,
      email,
      phone,
      address,
      city,
            items
    } = req.body;

    const finalName = customerName || name;

    if (
      !finalName ||
      !email ||
      !Array.isArray(items) ||
      items.length === 0
    ){
      return res.status(400).json({
        message: "Please provide valid order details."
      });
    }

    // Validate products and quantities
    const quantities = new Map();
    const normalizedItems = [];

    for (const item of items) {
      const productId = Number(item.id ?? item.product_id);
      const quantity = Number(item.quantity ?? item.qty);

      if (
        !Number.isInteger(productId) ||
        productId < 1 ||
        productId > 45 ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          message: "Invalid product or quantity in order."
        });
      }

      quantities.set(
        productId,
        (quantities.get(productId) || 0) + quantity
      );

      normalizedItems.push({
        ...item,
        id: productId,
        quantity,
        price: PRODUCT_PRICES[productId]
      });
    }
    // Calculate total using trusted server-side prices
    const orderTotal = normalizedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,0);
      if (!Number.isFinite(orderTotal) || orderTotal <= 0) {
        return res.status(400).json({
          message: "Invalid order total."});
        }
    // Start database transaction
    database.run("BEGIN TRANSACTION");
    transactionStarted = true;

    // Check actual stock in SQLite
    for (const [productId, quantity] of quantities) {
      const product = getOne(
        "SELECT stock FROM inventory WHERE product_id = ?",
        [productId]
      );

      if (!product) {
        database.run("ROLLBACK");
        transactionStarted = false;

        return res.status(400).json({
          message: `Product ${productId} was not found in inventory.`
        });
      }

      if (product.stock < quantity) {
        database.run("ROLLBACK");
        transactionStarted = false;

        return res.status(409).json({
          message: `Insufficient stock for product ${productId}. Available: ${product.stock}.`
        });
      }
    }

    // Deduct stock safely
    for (const [productId, quantity] of quantities) {
      database.run(
        `UPDATE inventory
         SET stock = stock - ?
         WHERE product_id = ? AND stock >= ?`,
        [quantity, productId, quantity]
      );

      if (database.getRowsModified() !== 1) {
        throw new Error("Stock update failed.");
      }
    }

    const orderId = "NEX-" + Date.now().toString();

    // Save order
    database.run(
      `INSERT INTO orders
       (order_id, customer_name, email, phone, address, city, items, total)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        finalName,
        email,
        phone || "",
        address || "",
        city || "",
        JSON.stringify(normalizedItems),
        orderTotal
      ]
    );

    // Save or update customer
    const existingCustomer = getOne(
      "SELECT id FROM customers WHERE email = ?",
      [email]
    );

    if (existingCustomer) {
      database.run(
        `UPDATE customers
         SET name = ?, phone = ?, address = ?, city = ?
         WHERE email = ?`,
        [
          finalName,
          phone || "",
          address || "",
          city || "",
          email
        ]
      );
    } else {
      database.run(
        `INSERT INTO customers
         (name, email, phone, address, city)
         VALUES (?, ?, ?, ?, ?)`,
        [
          finalName,
          email,
          phone || "",
          address || "",
          city || ""
        ]
      );
    }

    database.run("COMMIT");
    transactionStarted = false;

    saveDatabase();

    res.status(201).json({
      message: "Order placed successfully.",
      orderId
    });

  } catch (error) {
    if (transactionStarted) {
      database.run("ROLLBACK");
    }

    console.error(error);

    res.status(500).json({
      message: "Could not place order."
    });
  }
});


app.get("/api/orders", verifyAdmin, (req, res) => {
  const orders = getAll(
    "SELECT * FROM orders ORDER BY id DESC"
  );

  res.json(orders.map(order => ({
    ...order,
    items: JSON.parse(order.items)
  })));
});

app.patch("/api/orders/:id/status", verifyAdmin, (req, res) => {
  const { status } = req.body;

  const allowedStatuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled"
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid order status."
    });
  }

  const order = getOne(
    "SELECT id FROM orders WHERE order_id = ?",
    [req.params.id]
  );

  if (!order) {
    return res.status(404).json({
      message: "Order not found."
    });
  }

  run(
    "UPDATE orders SET status = ? WHERE order_id = ?",
    [status, req.params.id]
  );

  res.json({
    message: "Order status updated."
  });
});

app.get("/api/customers", verifyAdmin, (req, res) => {
  const customers = getAll(
    "SELECT * FROM customers ORDER BY id DESC"
  );

  res.json(customers);
});

app.get("/api/dashboard", verifyAdmin, (req, res) => {
  const totalOrders = getOne(
    "SELECT COUNT(*) AS total FROM orders"
  ).total;

  const totalCustomers = getOne(
    "SELECT COUNT(*) AS total FROM customers"
  ).total;

  const totalSales = getOne(
    `SELECT COALESCE(SUM(total), 0) AS total
     FROM orders
     WHERE status != 'Cancelled'`
  ).total;

  const pendingOrders = getOne(
    "SELECT COUNT(*) AS total FROM orders WHERE status = 'Pending'"
  ).total;

  res.json({
    totalOrders,
    totalCustomers,
    totalSales,
    pendingOrders
  });
});

app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      message: "Origin not allowed."
    });
  }

  console.error("Server error:", err);

  res.status(500).json({
    message: "Internal server error."
  });
});

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();
