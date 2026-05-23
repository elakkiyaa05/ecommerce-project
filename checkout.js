const cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkout-items");

let total = 0;

cart.forEach(item => {

  total += item.price * item.quantity;

  checkoutItems.innerHTML += `
    <div class="cart-item">
      <h3>${item.name}</h3>
      <p>Price: ₹${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
    </div>
  `;
});

document.getElementById("checkout-total").innerText =
  "Total: ₹" + total;

function placeOrder() {

  alert("Order placed successfully!");

  localStorage.removeItem("cart");

  window.location.href = "index.html";
}