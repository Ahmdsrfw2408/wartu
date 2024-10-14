const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = {}; // Struktur keranjang sebagai objek
let total = 0;
let currentSlide = 0;

// Toggle menu (Hamburger)
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Event listeners for menu links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("data-target");
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.remove("active");
    });
    document.getElementById(targetId).classList.add("active");
  });
});

// **Add to cart functionality**
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".menu-item");
    const name = item.getAttribute("data-name");
    const price = parseInt(item.getAttribute("data-price"));

    addToCart(name, price);
  });
});

// Cart modal functionality
cartBtn.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
  updateCartDisplay(); // Pastikan tampilan keranjang diperbarui saat dibuka
});

closeCartBtn.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

// **Function to redirect to the checkout page**
checkoutBtn.addEventListener("click", () => {
  localStorage.setItem("totalPrice", total);
  window.location.href = "payment.html"; // Ganti dengan URL yang sesuai
});

// **Add to cart function**
function addToCart(name, price) {
  if (cart[name]) {
    cart[name].quantity += 1; // Tambah jumlah jika item sudah ada
  } else {
    cart[name] = { price: price, quantity: 1 }; // Tambah item baru
  }
  total += price; // Tambahkan harga ke total
  updateCartDisplay(); // Perbarui tampilan keranjang
}

// **Update cart display**
function updateCartDisplay() {
  cartItemsList.innerHTML = ""; // Kosongkan daftar keranjang
  let totalPrice = 0; // Reset total harga

  for (const [name, item] of Object.entries(cart)) {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.dataset.name = name;
    li.innerHTML = `
      <span class="item-name">${name}</span>
      <span class="item-price">Rp ${item.price}</span>
      <button class="decrease" onclick="changeQuantity('${name}', -1)">-</button>
      <span class="item-quantity">${item.quantity}</span>
      <button class="increase" onclick="changeQuantity('${name}', 1)">+</button>
    `;
    cartItemsList.appendChild(li);
    totalPrice += item.price * item.quantity; // Hitung total harga
  }

  cartTotal.textContent = totalPrice; // Perbarui total harga di UI
  cartCount.textContent = Object.keys(cart).length; // Perbarui jumlah item
}

// **Change quantity of items in the cart**
function changeQuantity(name, change) {
  if (cart[name]) {
    cart[name].quantity += change; // Tambah atau kurangi jumlah
    total += cart[name].price * change; // Update total

    if (cart[name].quantity <= 0) {
      delete cart[name]; // Hapus item jika jumlahnya 0
    }

    updateCartDisplay(); // Perbarui tampilan keranjang
  }
}
// Inisialisasi variabel currentSlide

// **Slider functionality**
function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;

  // Validasi batas index
  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }

  // Pindahkan slider
  const slider = document.querySelector(".slider");
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// **Event Listener untuk navigasi slide**
document.querySelector(".next-slide").addEventListener("click", () => {
  moveSlide(1);
});

document.querySelector(".prev-slide").addEventListener("click", () => {
  moveSlide(-1);
});

// **Move slide function**
function moveSlide(direction) {
  showSlide(currentSlide + direction);
}

// Tampilkan slide awal
showSlide(currentSlide);
