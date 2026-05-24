// PRODUCTS
const products = [
  {
    id: 1,
    name: "Running Shoes",
    price: 1499,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  },
  {
    id: 3,
    name: "Headphones",
    price: 1999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  }
];

// CART (LOAD FROM LOCALSTORAGE)
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let quantities = {};
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// DISPLAY PRODUCTS
function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach(product => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" />
        <h2>${product.name}</h2>
        <p>₹${product.price}</p>
        <div class="qty-buttons">
  <button onclick="decreaseQty(${product.id})">-</button>

  <span id="qty-${product.id}">0</span>

  <button onclick="addToCart(${product.id})">+</button>
</div>
      </div>
    `;
  });
}
function searchProducts() {
  const searchValue = document
    .getElementById("search-input")
    .value
    .toLowerCase();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchValue)
  );

  const productList = document.getElementById("product-list");

  productList.innerHTML = "";

  filteredProducts.forEach(product => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" />
        <h2>${product.name}</h2>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    `;
  });
}

// ADD TO CART
function addToCart(id) {

  // 1. Initialize quantity if not exists
  if (!quantities[id]) {
    quantities[id] = 0;
  }

  // 2. Increase quantity
  quantities[id]++;

  // 3. Find product
  const product = products.find(p => p.id === id);

  // 4. Check if already in cart
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  // 5. Save to localStorage (IMPORTANT)
  localStorage.setItem("cart", JSON.stringify(cart));

  // 6. Update UI (cart count, totals etc.)
  updateCartUI();

  // 7. Update product quantity display
  document.getElementById("qty-" + id).innerText = quantities[id];
  saveCart();
}
// REMOVE FROM CART
function removeFromCart(id) {
  const item = cart.find(p => p.id === id);

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(p => p.id !== id);
  }

  updateStorage();
  updateCartUI();
}

// UPDATE CART UI
function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>Price: ₹${item.price}</p>
        <p>Qty: ${item.quantity}</p>
        <p>Total: ₹${item.price * item.quantity}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
  document.getElementById("cart-count").innerText = cart.length;
}

// SAVE TO LOCALSTORAGE
function updateStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// INIT
displayProducts();
updateCartUI();
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
function decreaseQty(id) {
  if (!quantities[id]) return;

  quantities[id]--;

  if (quantities[id] < 0) {
    quantities[id] = 0;
  }

  document.getElementById("qty-" + id).innerText = quantities[id];
}
