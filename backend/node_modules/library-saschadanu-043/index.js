// index.js - Library Kelompok-6 (Frontend Utils)

// 🔹 Fungsi sapaan (bisa dipakai di UI)
export function greet(name) {
  return `👋 Halo ${name}, selamat datang di Project Kelompok-6 🚀`;
}

// 🔹 Format angka ke Rupiah
export function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

// 🔹 Validasi email sederhana
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// 🔹 Generate warna random (misalnya untuk avatar user)
export function randomColor() {
  const colors = ["#F87171", "#60A5FA", "#34D399", "#FBBF24", "#A78BFA", "#F472B6"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 🔹 Format tanggal ke versi lokal (Indonesia)
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
