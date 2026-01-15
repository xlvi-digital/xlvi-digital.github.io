/* ======================
   STATE GLOBAL
====================== */
let selectedTheme = null;
let selectedCategory = null;
let selectedPhoto = null;

let selectedPackageType = null;
let selectedPackage = null;
let selectedPrice = null;
let selectedPcs = null;

/* ======================
   STEPPER CONTROL
====================== */
const steps = document.querySelectorAll(".step");

function setStep(stepIndex) {
  steps.forEach((step, index) => {
    step.classList.remove("active", "done");

    if (index < stepIndex) {
      step.classList.add("done");
    } else if (index === stepIndex) {
      step.classList.add("active");
    }
  });
}

/* ======================
   ORDER BAR
====================== */
function showBar(text) {
  const bar = document.getElementById("orderBar");
  bar.innerText = text;
  bar.classList.remove("hidden");
}

/* ======================
   FILTER (TEMA & FOTO)
====================== */
let themeFilter = "all";
let photoFilter = "all";

function filterTheme(theme, e) {
  themeFilter = theme;
  setActive(e);
  applyFilter();
}

function filterPhoto(photo, e) {
  photoFilter = photo;
  setActive(e);
  applyFilter();
}

function applyFilter() {
  document.querySelectorAll(".preview-card").forEach((card) => {
    const theme = card.dataset.theme;
    const photo = card.dataset.photo;

    const show = (themeFilter === "all" || theme === themeFilter) && (photoFilter === "all" || photo === photoFilter);

    card.style.display = show ? "block" : "none";
  });
}

function setActive(e) {
  e.target.parentElement.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));

  e.target.classList.add("active");
}

/* ======================
   SELECT THEME
====================== */
function selectTheme(el, name, category, photo) {
  document.querySelectorAll(".preview-card").forEach((c) => c.classList.remove("selected"));

  el.classList.add("selected");

  selectedTheme = name;
  selectedCategory = category;
  selectedPhoto = photo;

  showBar(`Tema dipilih: ${name}`);
  setStep(1); // ke Jenis Paket
}

/* ======================
   SELECT PACKAGE TYPE
====================== */
function selectPackageType(type, el) {
  document.querySelectorAll(".type-card").forEach((c) => c.classList.remove("active"));

  el.classList.add("active");

  selectedPackageType = type;
  selectedPackage = null;
  selectedPrice = null;
  selectedPcs = null;

  renderPackages();
  showBar(`Jenis paket: ${type}`);
  setStep(2); // ke Pilih Paket
}

/* ======================
   RENDER PACKAGES
====================== */
function renderPackages() {
  const box = document.getElementById("packageList");
  box.innerHTML = "";

  if (selectedPackageType === "Digital Only") {
    box.innerHTML += digitalCard("Classic Digital", "Rp 50.000", ["Countdown", "Maps", "Angpao Digital", "Detail Acara", "Music Latar", "Social Share", "Nama Tamu Unik"], ["Gallery Foto", "Form Ucapan"]);

    box.innerHTML += digitalCard("Elegant Digital", "Rp 75.000", ["Countdown", "Maps", "Angpao Digital", "Detail Acara", "Music Latar", "Social Share", "Nama Tamu Unik", "Form Ucapan"], ["Gallery Foto"]);

    box.innerHTML += digitalCard("Exclusive Digital", "Rp 100.000", ["Countdown", "Maps", "Angpao Digital", "Detail Acara", "Music Latar", "Social Share", "Nama Tamu Unik", "Form Ucapan", "Gallery Foto"], []);
  }

  if (selectedPackageType === "Hybrid") {
    box.innerHTML += hybridCard("Elegant Hybrid", { 20: "145.000", 50: "250.000", 100: "425.000" });

    box.innerHTML += hybridCard("Exclusive Hybrid", { 20: "165.000", 50: "270.000", 100: "445.000" });
  }
}

/* ======================
   CARD TEMPLATES
====================== */
function digitalCard(name, price, include, exclude) {
  return `
  <div class="card">
    <h2>${name}</h2>
    <div class="price">${price}</div>

    <ul class="features">
      ${include.map((f) => `<li>✔ ${f}</li>`).join("")}
      ${exclude.map((f) => `<li style="color:#aaa">✖ ${f}</li>`).join("")}
    </ul>

    <a class="btn-order"
       onclick="orderNow('${name}','${price}')">
       Pesan Paket Ini
    </a>
  </div>`;
}

function hybridCard(name, prices) {
  return `
  <div class="card">
    <h2>${name}</h2>

    <div class="pcs-options">
      ${Object.keys(prices)
        .map(
          (pcs) => `
        <label>
          <input type="radio" name="${name}"
            onclick="selectHybrid('${name}','${pcs}','Rp ${prices[pcs]}')">
          ${pcs} pcs – Rp ${prices[pcs]}
        </label>
      `
        )
        .join("")}
    </div>

    <a class="btn-order"
       onclick="orderNow('${name}')">
       Pesan Paket Ini
    </a>
  </div>`;
}

/* ======================
   HYBRID SELECT
====================== */
function selectHybrid(name, pcs, price) {
  selectedPackage = name;
  selectedPcs = pcs;
  selectedPrice = price;

  showBar(`${name} · ${pcs} pcs dipilih`);
}

/* ======================
   ORDER WHATSAPP
====================== */
function orderNow(packageName, price) {
  if (!selectedTheme || !selectedPackageType) {
    showBar("Lengkapi pilihan terlebih dahulu");
    return;
  }

  if (selectedPackageType === "Hybrid" && !selectedPcs) {
    showBar("Pilih jumlah undangan fisik");
    return;
  }

  setStep(3); // WhatsApp

  const message = `Halo XLVI-Digital,

Saya ingin memesan undangan dengan detail berikut:

Tema            : ${selectedTheme}
Kategori        : ${selectedCategory}
Foto            : ${selectedPhoto}

Jenis Paket     : ${selectedPackageType}
Paket           : ${packageName}
${selectedPcs ? `Undangan Fisik  : ${selectedPcs} pcs\n` : ""}
Harga           : ${price || selectedPrice}

Mohon info langkah selanjutnya.
Terima kasih.`;

  const phone = "6282119502976";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
