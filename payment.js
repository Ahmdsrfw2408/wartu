// Ambil total harga dari localStorage
const totalPrice = localStorage.getItem("totalPrice");
console.log("Total Harga dari localStorage:", totalPrice); // Debug

// Tampilkan total harga di halaman
const paymentTotalElement = document.getElementById("payment-total");
paymentTotalElement.textContent = totalPrice || "0";

// Ambil elemen-elemen input, tombol, dan modal
const paymentForm = document.getElementById("payment-form");
const confirmPaymentBtn = document.getElementById("confirm-payment");
const paymentModal = document.getElementById("payment-modal");
const paymentMethodSelect = document.getElementById("payment-method");
const bankSelection = document.getElementById("bank-selection");
const closeModalBtn = document.getElementById("close-modal");
const printReceiptBtn = document.getElementById("print-receipt");

// Elemen untuk menampilkan data di modal
const modalName = document.getElementById("modal-name");
const modalAltujuan = document.getElementById("modal-altujuan");
const modalEmail = document.getElementById("modal-email");
const modalPhone = document.getElementById("modal-phone");
const modalMethod = document.getElementById("modal-method");
const modalTotal = document.getElementById("modal-total");

// Tampilkan atau sembunyikan pilihan bank berdasarkan metode pembayaran
paymentMethodSelect.addEventListener("change", (e) => {
  if (e.target.value === "bank_transfer") {
    bankSelection.style.display = "block"; // Tampilkan pilihan bank
  } else {
    bankSelection.style.display = "none"; // Sembunyikan jika bukan transfer bank
  }
});

// Aktifkan tombol konfirmasi jika semua input valid
paymentForm.addEventListener("input", () => {
  confirmPaymentBtn.disabled = !paymentForm.checkValidity();
});

// Event listener untuk konfirmasi pembayaran
paymentForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent halaman reload

  const name = document.getElementById("name").value;
  const altujuan = document.getElementById("altujuan").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const paymentMethod = paymentMethodSelect.value;
  let bank = "";
  let accountNumber = "";

  // Jika metode pembayaran adalah transfer bank, ambil pilihan bank dan nomor rekening
  if (paymentMethod === "bank_transfer") {
    bank = document.getElementById("bank").value;
    accountNumber = document.getElementById("account-number").value;
  }

  // Isi data ke modal
  modalName.textContent = name;
  modalAltujuan.textContent = altujuan;
  modalEmail.textContent = email;
  modalPhone.textContent = phone;
  modalMethod.textContent = paymentMethod;

  if (paymentMethod === "bank_transfer") {
    modalMethod.textContent += ` - ${bank} (${accountNumber})`;
  }

  modalTotal.textContent = totalPrice || "0";

  // Tampilkan modal dan sembunyikan form
  paymentForm.style.display = "none";
  paymentModal.style.display = "flex";

  // Hapus data keranjang dan total harga dari localStorage
  localStorage.removeItem("totalPrice");
});

// Event listener untuk menutup modal
closeModalBtn.addEventListener("click", () => {
  paymentModal.style.display = "none";
  window.location.href = "index.html"; // Redirect ke halaman utama
});

// Event listener untuk cetak struk
printReceiptBtn.addEventListener("click", () => {
  window.print(); // Cetak halaman
});
