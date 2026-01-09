fetch("/api/berita")
  .then((response) => response.json())
  .then((data) => {
    const divBerita = document.querySelector("#list-berita");
    if (data.error) {
      divBerita.innerHTML = `<p>${data.error}</p>`;
    } else {
      let html = "";
      data.forEach((item, i) => {
        html += `
          <div style="margin-bottom:20px; padding:10px; border:1px solid #ddd; border-radius:10px;">
            <h3>${i + 1}. ${item.title || "Tanpa Judul"}</h3>
            <p>${item.description || "Tidak ada deskripsi berita."}</p>
            <p><b>Sumber:</b> ${item.source || "Tidak diketahui"}</p>
          </div>
        `;
      });
      divBerita.innerHTML = html;
    }
  })
  .catch((error) => {
    document.querySelector(
      "#list-berita"
    ).innerHTML = `<p>Gagal memuat berita: ${error.message}</p>`;
  });
