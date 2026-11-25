import { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  createOrder,
  adminLogin,
  getAdminData,
  changeOrderStatus,
  getInventory,
  updateProductStock
} from "./api";

const products = [
  ["Classic Leather Jacket","Jackets",8500,"https://i.pinimg.com/736x/e0/2a/b6/e02ab6694d2bd31c33944cadc1c6735b.jpg"],
  ["Brown Biker Jacket","Jackets",9200,"https://i.pinimg.com/736x/4d/35/99/4d35995584108f6bfc6f1d3e52d34bba.jpg"],
  ["Denim Trucker Jacket","Jackets",6500,"https://i.pinimg.com/1200x/2c/3f/8c/2c3f8c35589616a3f2da014eb30ecb8a.jpg"],
  ["Cropped Puffer Jacket","Jackets",7800,"https://i.pinimg.com/736x/e7/f2/ad/e7f2ad7e134e557540604e8e39c8b477.jpg"],
  ["Long Wool Coat","Jackets",11500,"https://i.pinimg.com/1200x/a5/ea/d7/a5ead7a9e528ee43dbfdb3633ba91204.jpg"],
  ["Oversized Denim Jacket","Jackets",7200,"https://i.pinimg.com/1200x/8a/66/9e/8a669e6ec464c4b73803ef95a00711b1.jpg"],
  ["Black Bomber Jacket","Jackets",8900,"https://i.pinimg.com/736x/71/7d/10/717d101d4c5eda49de7a7d59503bf28e.jpg"],
  ["Suede Casual Jacket","Jackets",9800,"https://i.pinimg.com/736x/ba/be/d0/babed0fdbbcc597fd2f20f5348bf8be8.jpg"],
  ["Slim Fit Blue Jeans","Pants & Jeans",4200,"https://i.pinimg.com/736x/55/7c/37/557c370a19e39d6bf535911384b963fb.jpg"],
  ["Wide Leg Trousers","Pants & Jeans",3900,"https://i.pinimg.com/736x/a1/92/7f/a1927f1b98e2db491a261f699d2f58e3.jpg"],
  ["Black Straight Jeans","Pants & Jeans",4500,"https://i.pinimg.com/736x/7b/91/53/7b91532c498b36fc5ba928e444561f29.jpg"],
  ["Relaxed Fit Denim","Pants & Jeans",4800,"https://i.pinimg.com/1200x/ac/73/c9/ac73c95d673968284acf1ef715dba07b.jpg"],
  ["Cargo Pants","Pants & Jeans",5200,"https://i.pinimg.com/1200x/bd/c6/28/bdc6282e8e8fbc718a740935fd954d18.jpg"],
  ["Beige Chino Pants","Pants & Jeans",4300,"https://i.pinimg.com/736x/31/bf/fc/31bffc70110b5a8cd12897cf83b63254.jpg"],
  ["Grey Jogger Pants","Pants & Jeans",3500,"https://i.pinimg.com/736x/e2/61/14/e261141fe970be14e3240a0d2285ed75.jpg"],
  ["Classic Black Trousers","Pants & Jeans",4100,"https://i.pinimg.com/736x/b5/ab/98/b5ab98f9f6facc66a14e9a33db1646af.jpg"],
  ["Light Wash Jeans","Pants & Jeans",4600,"https://i.pinimg.com/1200x/a3/9f/30/a39f30a54269e7194b4701b2b67b1a6a.jpg"],
  ["Essential Black Hoodie","Hoodies & Sweatshirts",3800,"https://i.pinimg.com/736x/c8/d3/39/c8d3393ccf7fedfeaf88954d56017dae.jpg"],
  ["Oversized Grey Hoodie","Hoodies & Sweatshirts",4200,"https://i.pinimg.com/1200x/d9/8d/70/d98d705d69fdc81c5ca7153fdc7f8647.jpg"],
  ["Minimal White Hoodie","Hoodies & Sweatshirts",3900,"https://i.pinimg.com/736x/f9/26/6e/f9266e0aaa86f97c6251dc39fd2889d9.jpg"],
  ["Graphic Print Hoodie","Hoodies & Sweatshirts",4500,"https://i.pinimg.com/736x/81/23/63/812363d012c82c6541af17d5fcb50fc5.jpg"],
  ["Zip-Up Hoodie","Hoodies & Sweatshirts",4300,"https://i.pinimg.com/736x/69/1d/ab/691dab7f3bbd3d8e08a865642085433f.jpg"],
  ["Olive Sweatshirt","Hoodies & Sweatshirts",3600,"https://i.pinimg.com/1200x/86/3f/e1/863fe17dfeb7bd64b1a45b9a4b559da2.jpg"],
  ["Navy Blue Sweatshirt","Hoodies & Sweatshirts",3700,"https://i.pinimg.com/1200x/fc/76/a7/fc76a7a03b6e32fd4653198cc1710dbc.jpg"],
  ["Beige Pullover Hoodie","Hoodies & Sweatshirts",4400,"https://i.pinimg.com/736x/f1/35/79/f135795c7ce7473e41bad75e24184f2e.jpg"],
  ["White Cotton T-Shirt","Shirts & T-Shirts",1800,"https://i.pinimg.com/1200x/6b/3e/ab/6b3eab617b37a378e5f55d19fe7a895c.jpg"],
  ["Striped Casual Shirt","Shirts & T-Shirts",3200,"https://i.pinimg.com/736x/47/f9/e1/47f9e1eeae02e3fc5a7826154baa57ae.jpg"],
  ["Linen Button Shirt","Shirts & T-Shirts",3500,"https://i.pinimg.com/1200x/96/96/67/9696671b24ef6dff60ffce8ddc23a0da.jpg"],
  ["Black Formal Shirt","Shirts & T-Shirts",3000,"https://i.pinimg.com/1200x/ec/f2/53/ecf253724782117ca336a1b7aa3df053.jpg"],
  ["Blue Oxford Shirt","Shirts & T-Shirts",3400,"https://i.pinimg.com/736x/c6/a3/14/c6a3147d3ed008bd09009e7957d74559.jpg"],
  ["Relaxed White Shirt","Shirts & T-Shirts",3300,"https://i.pinimg.com/736x/2a/46/e8/2a46e8dddc4cba11c96ea3e28e4721b2.jpg"],
  ["Printed Summer Tee","Shirts & T-Shirts",2200,"https://i.pinimg.com/736x/2c/fc/42/2cfc42558712b497a7c475c2e4437c89.jpg"],
  ["Basic Grey T-Shirt","Shirts & T-Shirts",1900,"https://i.pinimg.com/1200x/ca/5a/15/ca5a15b7c895c523a722dadacdc43561.jpg"],
  ["Polo Collar T-Shirt","Shirts & T-Shirts",2500,"https://i.pinimg.com/736x/59/0e/ad/590ead499c3460d2fad11c5ee0b5f377.jpg"],
  ["Graphic Oversized Tee","Shirts & T-Shirts",2400,"https://i.pinimg.com/1200x/b2/19/f0/b219f02e09081c7da387b23dfaecee98.jpg"],
  ["Women's Beige Co-ord Set","Women's Relaxed Wear",6200,"https://i.pinimg.com/736x/23/62/52/236252c918bda5f92851f699a4ff0182.jpg"],
  ["Relaxed Summer Dress","Women's Relaxed Wear",5500,"https://i.pinimg.com/736x/0d/8d/c0/0d8dc04c14dca0d25d4b4f8e3ba1b4e7.jpg"],
  ["Casual Weekend Outfit","Women's Relaxed Wear",5800,"https://i.pinimg.com/736x/ac/d9/a4/acd9a496efa9b3f440ea768701da5e3e.jpg"],
  ["Flowy Maxi Dress","Women's Relaxed Wear",6500,"https://i.pinimg.com/736x/2f/59/3b/2f593b584fb4f6b633aeb1e422543c29.jpg"],
  ["Women's Casual Outfit","Women's Relaxed Wear",5900,"https://i.pinimg.com/736x/35/71/a4/3571a4f3a4a9d43d1e508c06208d0ac6.jpg"],
  ["Relaxed Linen Outfit","Women's Relaxed Wear",6100,"https://i.pinimg.com/1200x/c1/3d/8c/c13d8c941b17a88afc4d94a4e0bca771.jpg"],
  ["Minimal Everyday Wear","Women's Relaxed Wear",5700,"https://i.pinimg.com/1200x/1a/fb/4d/1afb4d46ffe3ce5ca2ba6764647f7882.jpg"],
  ["Women's Wide Leg Set","Women's Relaxed Wear",6300,"https://i.pinimg.com/1200x/49/73/7a/49737a47324b8ccc6084f506b37198af.jpg"],
  ["Casual Layered Look","Women's Relaxed Wear",6000,"https://i.pinimg.com/736x/3d/54/09/3d5409b7ceeb03feb0793267c4a6e70e.jpg"],
  ["Soft Neutral Outfit","Women's Relaxed Wear",6400,"https://i.pinimg.com/736x/98/ff/fc/98fffc9c204f4e833977652b75468e27.jpg"],
].map(([name, category, price, image], index) => ({
  id: index + 1,
  name,
  category,
  price,
  image: image.trim(),
  stock: 10,
}));

const refreshProductImages = (items) =>
  items.map((item) => {
    const updatedProduct = products.find(
      (product) => product.id === item.id
    );

    return updatedProduct
      ? { ...item, image: updatedProduct.image }
      : item;
  });

const categories = [
  "All Products",
  "Jackets",
  "Pants & Jeans",
  "Hoodies & Sweatshirts",
  "Shirts & T-Shirts",
  "Women's Relaxed Wear",
];

const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const readStorage = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

function App() {
  const [category, setCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState(() =>
  refreshProductImages(readStorage("nexus-cart", []))
);

const [inventory, setInventory] = useState(() =>
  refreshProductImages(readStorage("nexus-inventory", products))
);
  const [orders, setOrders] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [adminSearch, setAdminSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customer, setCustomer] = useState({
    name: "", email: "", phone: "", address: "", city: "",
  });

  const [adminToken, setAdminToken] = useState(
  () => localStorage.getItem("nexus-admin-token") || ""
);
const [adminEmail, setAdminEmail] = useState("");
const [adminPassword, setAdminPassword] = useState("");
const [adminError, setAdminError] = useState("");
const [adminLoading, setAdminLoading] = useState(false);
const [adminLoggedIn, setAdminLoggedIn] = useState(false);

const [customers, setCustomers] = useState([]);
const [dashboardData, setDashboardData] = useState({
  totalOrders: 0,
  totalCustomers: 0,
  totalSales: 0,
  pendingOrders: 0
});

const [stockDrafts, setStockDrafts] = useState({});

  useEffect(() => {
    localStorage.setItem("nexus-cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
  localStorage.setItem(
    "nexus-inventory",
    JSON.stringify(inventory)
  );
}, [inventory]);

useEffect(() => {
  const loadInventory = async () => {
    try {
      const stockData = await getInventory();

      setInventory((current) =>
        current.map((product) => {
          const databaseProduct = stockData.find(
            (item) => item.product_id === product.id
          );

          return databaseProduct
            ? { ...product, stock: databaseProduct.stock }
            : product;
        })
      );
    } catch (error) {
      console.error("Inventory loading failed:", error);
    }
  };

  loadInventory();
}, []);

  const filteredProducts = useMemo(() => {
    let result = inventory.filter((p) =>
      (category === "All Products" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [category, search, sort, inventory]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalSales = dashboardData.totalSales;

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(adminSearch.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(adminSearch.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const addToCart = (product) => {
  const availableProduct = inventory.find(
    (item) => item.id === product.id
  );

  const existingItem = cart.find(
    (item) => item.id === product.id
  );

  if (!availableProduct || availableProduct.stock <= 0) {
    alert("Sorry! This product is out of stock.");
    return;
  }

  if (
    existingItem &&
    existingItem.quantity >= availableProduct.stock
  ) {
    alert("Sorry! Available stock limit reached.");
    return;
  }

  setCart((current) => {
    const found = current.find(
      (item) => item.id === product.id
    );

    return found
      ? current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...current, { ...availableProduct, quantity: 1 }];
  });

  setCartOpen(true);
};

  const updateQuantity = (id, amount) => {
  const cartItem = cart.find((item) => item.id === id);

  if (!cartItem) return;

  const availableProduct = inventory.find(
    (item) => item.id === id
  );

  const newQuantity = cartItem.quantity + amount;

  if (newQuantity < 0) return;

  if (
    availableProduct &&
    newQuantity > availableProduct.stock
  ) {
    alert("Available stock limit reached.");
    return;
  }

  setCart((current) =>
    current
      .map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

  const removeItem = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const placeOrder = async (event) => {
  event.preventDefault();

  if (
    !customer.name ||
    !customer.email ||
    !customer.phone ||
    !customer.address ||
    !customer.city
  ) {
    alert("Please fill in all customer details.");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  try {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const response = await createOrder({
      customerName: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      items: cart,
      total
    });

    const newOrder = {
      id: response.orderId,
      date: new Date().toISOString(),
      customer: { ...customer },
      items: [...cart],
      total,
      payment: "Cash on Delivery",
      status: "Pending"
    };

    setOrders(previous => [newOrder, ...previous]);
    setCart([]);
    setCheckoutOpen(false);
    setCartOpen(false);
    setOrderConfirmation(newOrder);

    alert("Order successfully saved to database!");
  } catch (error) {
    alert(error.message);
  }
};

const loadAdminData = async (token) => {
  const [dbOrders, dbCustomers, dbDashboard] = await Promise.all([
    getAdminData("orders", token),
    getAdminData("customers", token),
    getAdminData("dashboard", token)
  ]);

  const formattedOrders = dbOrders.map((order) => ({
    id: order.order_id,
    date: order.created_at,
    customer: {
      name: order.customer_name,
      email: order.email,
      phone: order.phone || "",
      address: order.address || "",
      city: order.city || ""
    },
    items: typeof order.items === "string"
      ? JSON.parse(order.items)
      : order.items,
    total: Number(order.total),
    payment: "Cash on Delivery",
    status: order.status
  }));

  const formattedCustomers = dbCustomers.map((person) => {
    const customerOrders = formattedOrders.filter(
      (order) =>
        order.customer.email.toLowerCase() === person.email.toLowerCase()
    );

    return {
      name: person.name,
      email: person.email,
      phone: person.phone || "",
      address: person.address || "",
      city: person.city || "",
      orderCount: customerOrders.length,
      totalSpent: customerOrders
        .filter((order) => order.status !== "Cancelled")
        .reduce((sum, order) => sum + order.total, 0)
    };
  });

  setOrders(formattedOrders);
  setCustomers(formattedCustomers);
  setDashboardData(dbDashboard);
};

const handleAdminLogin = async (event) => {
  event.preventDefault();

  setAdminError("");
  setAdminLoading(true);

  try {
    const response = await adminLogin(adminEmail, adminPassword);

    localStorage.setItem("nexus-admin-token", response.token);
    setAdminToken(response.token);

    await loadAdminData(response.token);

    setAdminLoggedIn(true);
    setAdminPassword("");
  } catch (error) {
    setAdminError(error.message);
    localStorage.removeItem("nexus-admin-token");
    setAdminToken("");
    setAdminLoggedIn(false);
  } finally {
    setAdminLoading(false);
  }
};

const handleAdminLogout = () => {
  localStorage.removeItem("nexus-admin-token");
  setAdminToken("");
  setAdminLoggedIn(false);
  setAdminEmail("");
  setAdminPassword("");
  setOrders([]);
  setCustomers([]);
  setSelectedOrder(null);
  setDashboardData({
    totalOrders: 0,
    totalCustomers: 0,
    totalSales: 0,
    pendingOrders: 0
  });
};

const updateOrderStatus = async (id, newStatus) => {
  try {
    await changeOrderStatus(id, newStatus, adminToken);

    setOrders((current) =>
      current.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );

    setSelectedOrder((current) =>
      current?.id === id
        ? { ...current, status: newStatus }
        : current
    );

    await loadAdminData(adminToken);

    alert("Order status updated successfully!");
  } catch (error) {
    alert(error.message);
  }
};

const handleStockUpdate = async (productId) => {
  const stock = Number(
    stockDrafts[productId] ??
    inventory.find((item) => item.id === productId)?.stock
  );

  if (!Number.isInteger(stock) || stock < 0 || stock > 999) {
    alert("Stock must be a whole number between 0 and 999.");
    return;
  }

  try {
    const response = await updateProductStock(
      productId,
      stock,
      adminToken
    );

    setInventory((current) =>
      current.map((product) =>
        product.id === productId
          ? { ...product, stock: response.stock }
          : product
      )
    );

    setStockDrafts((current) => {
      const updated = { ...current };
      delete updated[productId];
      return updated;
    });

    alert("Product stock updated successfully!");
  } catch (error) {
    alert(error.message);
  }
};

useEffect(() => {
  if (!adminToken) return;

  let cancelled = false;

  const restoreAdminSession = async () => {
    try {
      await loadAdminData(adminToken);

      if (!cancelled) {
        setAdminLoggedIn(true);
      }
    } catch (error) {
      localStorage.removeItem("nexus-admin-token");

      if (!cancelled) {
        setAdminToken("");
        setAdminLoggedIn(false);
      }
    }
  };

  restoreAdminSession();

  return () => {
    cancelled = true;
  };
}, []);

  return (
    <div className="nexus-app">
      <header className="nexus-header">
        <a className="nexus-logo" href="#home">NEXUS<span>.</span></a>
        <nav>
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <a href="#crm">Mini CRM</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="cart-button" onClick={() => setCartOpen(true)}>
          Cart ({cartCount})
        </button>
      </header>

      <main>
        <section className="nexus-hero" id="home">
          <div>
            <p className="eyebrow">NEW SEASON · NEW STYLE</p>
            <h1>Wear Your<br /><em>Own Story.</em></h1>
            <p>Discover everyday essentials and timeless fashion pieces.</p>
            <a className="primary-button" href="#shop">Explore Collection</a>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CURATED FOR YOU</p>
              <h2>Our Collection</h2>
              <p className="muted">{filteredProducts.length} products available</p>
            </div>
            <div className="shop-tools">
              <input
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          <div className="shop-layout">
            <aside className="category-sidebar">
              <h3>Categories</h3>
              {categories.map((item) => (
                <button key={item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}>
                  {item}
                </button>
              ))}
            </aside>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.classList.add("image-error");
                      }} />
                    <span>{product.category}</span>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className={`stock-status ${
                      product.stock > 0 ? "in-stock" : "out-stock"
                      }`}>
                        {product.stock > 0
                        ? `In Stock (${product.stock})`
                        : "Out of Stock"}
                        </p>
                        <div className="product-bottom">
                          <strong>Rs. {product.price.toLocaleString()}</strong>
                          <div className="product-actions">
                            <button
                            className="details-button"
                            onClick={() => setSelectedProduct(product)}
                            >
                              Details
                              </button>
                              <button
                              onClick={() => addToCart(product)}
                              disabled={product.stock <= 0}
                              >
                                {product.stock > 0 ? "Add +" : "Unavailable"}
                                </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
              {filteredProducts.length === 0 && <p className="empty-message">No products found.</p>}
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          {selectedProduct && (
  <div
    className="product-detail-overlay"
    onClick={() => setSelectedProduct(null)}
  >
    <div
      className="product-detail-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="close-button product-detail-close"
        onClick={() => setSelectedProduct(null)}
      >
        ×
      </button>

      <div className="product-detail-content">

        <div className="product-detail-image">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
          />
        </div>

        <div className="product-detail-info">

          <p className="eyebrow">
            NEXUS COLLECTION
          </p>

          <h2>{selectedProduct.name}</h2>

          <p className="product-detail-category">
            Category: {selectedProduct.category}
          </p>

          <h3>
            Rs. {selectedProduct.price.toLocaleString()}
          </h3>

          <p className="product-detail-description">
            Explore this item from our curated
            NEXUS collection. View its product
            information and add it to your shopping cart.
          </p>

          <button
            className="primary-button"
            onClick={() => {
              addToCart(selectedProduct);
              setSelectedProduct(null);
            }}
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  </div>
)}
          <p className="eyebrow">OUR PHILOSOPHY</p>
          <h2>Style made simple.</h2>
          <p>NEXUS brings together versatile fashion essentials designed for comfort, confidence and everyday expression.</p>
        </section>


<section className="crm-section" id="crm">
  {!adminLoggedIn ? (
    <>
      <div className="crm-heading">
        <div>
          <p className="eyebrow">ADMINISTRATION</p>
          <h2>Admin Login</h2>
          <p className="muted">
            Login to manage your store orders and customers.
          </p>
        </div>
      </div>

      <div className="crm-panel admin-login-panel">
        <form className="checkout-form" onSubmit={handleAdminLogin}>
          <div className="form-group">
            <label>Admin Email</label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
            />
          </div>

          {adminError && (
            <p className="error-message">{adminError}</p>
          )}

          <button type="submit" disabled={adminLoading}>
            {adminLoading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </>
  ) : (
    <>
      <div className="crm-heading">
        <div>
          <p className="eyebrow">ADMINISTRATION</p>
          <h2>Mini CRM Dashboard</h2>
          <p className="muted">
            Manage your store orders and customer information.
          </p>
          <span className="crm-local-label">DATABASE CONNECTED</span>
        </div>

        <button onClick={handleAdminLogout}>
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Orders</p>
          <strong>{dashboardData.totalOrders}</strong>
        </div>

        <div className="stat-card">
          <p>Total Customers</p>
          <strong>{dashboardData.totalCustomers}</strong>
        </div>

        <div className="stat-card">
          <p>Total Sales</p>
          <strong>
            Rs. {Number(dashboardData.totalSales).toLocaleString()}
          </strong>
        </div>

        <div className="stat-card">
          <p>Pending Orders</p>
          <strong>{dashboardData.pendingOrders}</strong>
        </div>
      </div>


<div className="crm-panel">
  <div className="crm-heading">
    <h3>Inventory Management</h3>
    <span>{inventory.length} Products</span>
  </div>

  <div className="table-responsive">
    <table className="crm-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Current Stock</th>
          <th>New Stock</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {inventory.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>

            <td>{product.stock}</td>

            <td>
              <input
                type="number"
                min="0"
                max="999"
                value={
                  stockDrafts[product.id] ?? product.stock
                }
                onChange={(e) =>
                  setStockDrafts((current) => ({
                    ...current,
                    [product.id]: e.target.value
                  }))
                }
                style={{ width: "85px" }}
              />
            </td>

            <td>
              <button
                onClick={() => handleStockUpdate(product.id)}
              >
                Update Stock
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      <div className="crm-panel">
        <div className="crm-heading">
          <h3>Order Management</h3>
        </div>

        <div className="crm-filters">
          <input
            type="text"
            placeholder="Search orders or customers..."
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="table-responsive">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Update Status</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      <strong>{order.customer.name}</strong>
                      <br />
                      <small>{order.customer.email}</small>
                    </td>
                    <td>{order.date}</td>
                    <td>Rs. {Number(order.total).toLocaleString()}</td>
                    <td>{order.status}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="crm-panel">
  <h3>Customer Directory</h3>

  <div className="table-responsive">
    <table className="crm-table customer-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City</th>
          <th>Total Orders</th>
          <th>Total Spent</th>
        </tr>
      </thead>

      <tbody>
        {customers.length > 0 ? (
          customers.map((person) => (
            <tr key={person.email}>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td>{person.phone}</td>
              <td>{person.city}</td>
              <td>{person.orderCount}</td>
              <td>Rs. {Number(person.totalSpent).toLocaleString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No customers found.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
</>
)}
</section>

</main>

      <footer id="contact">
        <a className="nexus-logo" href="#home">NEXUS<span>.</span></a>
        <p>Everyday fashion. Your own story.</p>
        <small>© {new Date().getFullYear()} NEXUS-COMMERCE. All rights reserved.</small>
      </footer>

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <section className="side-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-heading">
              <h2>Your Cart</h2>
              <button className="close-button" onClick={() => setCartOpen(false)}>×</button>
            </div>
            {cart.length === 0 ? <p className="empty-message">Your cart is empty.</p> : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p>Rs. {item.price.toLocaleString()}</p>
                        <div className="quantity-control">
                          <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                          <button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="drawer-total">
                  <div><span>Subtotal</span><strong>Rs. {subtotal.toLocaleString()}</strong></div>
                  <p>Delivery charges will be confirmed separately.</p>
                  <button className="primary-button full-button" onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(true);
                  }}>Proceed to Checkout</button>
                </div>
              </>
            )}
          </section>
        </div>
      )}

      {checkoutOpen && (
        <div className="overlay" onClick={() => setCheckoutOpen(false)}>
          <section className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-heading">
              <div><p className="eyebrow">ALMOST YOURS</p><h2>Checkout</h2></div>
              <button className="close-button" onClick={() => setCheckoutOpen(false)}>×</button>
            </div>
            <div className="checkout-content">
              <form onSubmit={placeOrder} className="checkout-form">
                <h3>Customer Information</h3>
                <label>Full Name
                  <input required value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="Enter your full name" />
                </label>
                <label>Email Address
                  <input required type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} placeholder="example@email.com" />
                </label>
                <label>Phone Number
                  <input required type="tel" pattern="[0-9+() -]{7,20}" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="03XXXXXXXXX" />
                </label>
                <label>Delivery Address
                  <textarea required rows="3" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} placeholder="House number, street, area..." />
                </label>
                <label>City
                  <input required value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} placeholder="Your city" />
                </label>
                <div className="payment-box">
                  <h3>Payment Method</h3>
                  <p>● Cash on Delivery (COD)</p>
                  <small>Pay when your order is delivered.</small>
                </div>
                <button type="submit" className="primary-button full-button">
                  Place Order · Rs. {subtotal.toLocaleString()}
                </button>
              </form>
              <aside className="order-summary">
                <h3>Order Summary</h3>
                {cart.map((item) => (
                  <div className="summary-item" key={item.id}>
                    <span>{item.name} × {item.quantity}</span>
                    <strong>Rs. {(item.price * item.quantity).toLocaleString()}</strong>
                  </div>
                ))}
                <div className="summary-total"><span>Total</span><strong>Rs. {subtotal.toLocaleString()}</strong></div>
              </aside>
            </div>
          </section>
        </div>
      )}

      {orderConfirmation && (
        <div className="overlay confirmation-overlay">
          <section className="confirmation-card">
            <div className="success-icon">✓</div>
            <p className="eyebrow">THANK YOU FOR SHOPPING</p>
            <h2>Order Placed!</h2>
            <p>Your order has been received successfully.</p>
            <div className="confirmation-details">
              <p><span>Order ID</span><strong>{orderConfirmation.id}</strong></p>
              <p><span>Customer</span><strong>{orderConfirmation.customer.name}</strong></p>
              <p><span>Payment</span><strong>{orderConfirmation.payment}</strong></p>
              <p><span>Total</span><strong>Rs. {orderConfirmation.total.toLocaleString()}</strong></p>
              <p><span>Status</span><strong>{orderConfirmation.status}</strong></p>
            </div>
            <button className="primary-button full-button" onClick={() => setOrderConfirmation(null)}>
              Continue Shopping
            </button>
          </section>
        </div>
      )}

      {selectedOrder && (
        <div className="overlay confirmation-overlay" onClick={() => setSelectedOrder(null)}>
          <section className="order-detail-card" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-heading">
              <div><p className="eyebrow">ORDER INFORMATION</p><h2>{selectedOrder.id}</h2></div>
              <button className="close-button" onClick={() => setSelectedOrder(null)}>×</button>
            </div>
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
            <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
            <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
            <p><strong>Address:</strong> {selectedOrder.customer.address}, {selectedOrder.customer.city}</p>
            <h3>Ordered Products</h3>
            {selectedOrder.items.map((item) => (
              <div className="detail-product" key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <strong>Rs. {(item.price * item.quantity).toLocaleString()}</strong>
              </div>
            ))}
            <div className="summary-total"><span>Order Total</span><strong>Rs. {selectedOrder.total.toLocaleString()}</strong></div>
            <p><strong>Payment:</strong> {selectedOrder.payment}</p>
            <label className="detail-status">Update Order Status
              <select value={orders.find((o) => o.id === selectedOrder.id)?.status || selectedOrder.status}
                onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}>
                {statuses.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;