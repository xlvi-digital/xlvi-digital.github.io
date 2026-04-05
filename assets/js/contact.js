document.addEventListener('DOMContentLoaded', () => {
  const waForm = document.getElementById('waForm');

  if (waForm) {
    waForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const nama = document.getElementById('nama').value.trim();
      const kontak = document.getElementById('kontak').value.trim();
      const layanan = document.getElementById('layanan').value;
      const pesan = document.getElementById('pesan').value.trim();

      // Target WhatsApp number (can be changed easily)
      const phone = '6282119502976';

      // Construct message
      let message = `Halo XLVI.ID,\n\n`;
      message += `Terdapat pesan baru dari calon klien dengan detail berikut:\n\n`;
      message += `*Nama:* ${nama}\n`;
      message += `*Kontak (Email/WA):* ${kontak}\n`;
      message += `*Jenis Layanan:* ${layanan}\n`;
      message += `*Pesan:* \n${pesan}\n\n`;
      message += `Mohon segera dibalas. Terima kasih.`;

      // Redirect to WhatsApp
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');

      // Reset form
      waForm.reset();
    });
  }
});
