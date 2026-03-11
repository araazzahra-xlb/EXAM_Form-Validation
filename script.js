// STEP 1: Ambil elemen HTML yang kita butuhkan
// Disimpan di variabel biar ga perlu cari ulang berkali-kali
const form = document.getElementById("RegistForm");
const messageEl = document.getElementById("message");
const summaryEl = document.getElementById("summary");

// STEP 2: Dengarkan event "submit" pada form
// Setiap kali tombol Submit diklik, function di dalam sini bakal jalan
form.addEventListener("submit", function (e) {
  // Tahan reload halaman
  e.preventDefault();

  // STEP 3: Ambil nilai dari semua input
  // Text & Date → langsung .value
  // .trim() → buang spasi di awal & akhir (misal "  Ara  " → "Ara")
  const fullName = document.getElementById("fullName").value.trim();
  const birthDate = document.getElementById("birthDate").value;

  // Dropdown → juga pakai .value
  const religion = document.getElementById("religion").value;

  // Radio → cari yang sedang :checked, lalu ambil .value-nya
  // Kalau belum ada yang dipilih, querySelector return null
  // Maka kita pakai ternary: kalau null → isi string kosong ""
  const genderEl = document.querySelector("input[name='Gender']:checked");
  const gender = genderEl ? genderEl.value : "";

  // Checkbox → querySelectorAll karena bisa lebih dari satu yang dicentang
  // Hasilnya NodeList (mirip array), bukan satu nilai
  const checkedBoxes = document.querySelectorAll("input[name='hdyk']:checked");

  // STEP 4: Validasi satu per satu
  // Kalau ada yang tidak valid → showError() lalu return (berhenti)

  if (fullName === "") {
    showError("Full Name cannot be empty!");
    return;
  }

  if (birthDate === "") {
    showError("Date of Birth must be selected!");
    return;
  }

  if (gender === "") {
    showError("Gender must be selected!");
    return;
  }

  if (religion === "") {
    showError("Religion must be selected!");
    return;
  }

  // .length → cek jumlah checkbox yang dicentang
  if (checkedBoxes.length === 0) {
    showError("Please select at least one information source!");
    return;
  }

  // STEP 5: Semua valid → tampilkan summary
  // Tampilkan pesan sukses
  messageEl.textContent = "Registration successful!";
  messageEl.style.color = "green";

  // Ubah NodeList → Array, lalu ambil .value tiap checkbox → jadi array teks
  // Contoh hasil: ["- Brochure", "- Website"]
  const sources = Array.from(checkedBoxes).map(function (cb) {
    return "- " + cb.value;
  });

  // Gabungkan array menjadi satu string, pisahkan per baris (\n)
  const sourcesText = sources.join("\n");

  // Susun teks summary
  const summaryText =
    "=== REGISTRATION DATA ===\n" +
    "Full Name    : " +
    fullName +
    "\n" +
    "Date of Birth: " +
    birthDate +
    "\n" +
    "Gender       : " +
    gender +
    "\n" +
    "Religion     : " +
    religion +
    "\n" +
    "Info Source  :\n" +
    sourcesText;

  // Isi konten div#summary, lalu tampilkan (awalnya display: none di CSS)
  summaryEl.textContent = summaryText;
  summaryEl.style.display = "block";

  // Reset semua isian form setelah berhasil
  form.reset();
});

// ============================================================
// HELPER FUNCTION: Tampilkan pesan error
// Dipisah jadi function sendiri supaya tidak perlu tulis ulang
// 3 baris ini setiap kali ada validasi error
// ============================================================
function showError(message) {
  messageEl.textContent = message;
  messageEl.style.color = "red";
  summaryEl.style.display = "none";
}
