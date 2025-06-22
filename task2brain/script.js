// Products
const products = [
  { id: 1, name: "Wireless Headphones", price: 59.99, image: "images/headphones.jpeg" },
  { id: 2, name: "Smart Watch", price: 99.99, image: "images/smart+watch.jpeg" },
  { id: 3, name: "Gaming Mouse", price: 39.99, image: "images/mouse.jpeg" },
  { id: 4, name: "Bluetooth Speaker", price: 79.99, image: "images/speakers.jpeg" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const productSection = document.getElementById("products");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

function updateCart() {
  cartCount.textContent = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = total.toFixed(2);
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCart();
}

function loadProducts() {
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productSection.appendChild(div);
  });
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const storedPass = localStorage.getItem(user);
  if (storedPass === pass) {
    document.getElementById("auth").style.display = "none";
    alert(`Welcome back, ${user}!`);
  } else {
    document.getElementById("auth-message").textContent = "Invalid credentials.";
  }
}

function signup() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user && pass) {
    localStorage.setItem(user, pass);
    alert("Signup successful! Please log in.");
  } else {
    document.getElementById("auth-message").textContent = "Please fill in both fields.";
  }
}

loadProducts();
updateCart();
