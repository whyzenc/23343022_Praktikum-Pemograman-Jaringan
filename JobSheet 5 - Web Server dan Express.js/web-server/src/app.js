const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

//Mendefinisikan path untuk konfigurasi express
const direktoriPublic = path.join(__dirname, "../public");
const direktoriViews = path.join(__dirname, "../templates/views");
const direktoriPartials = path.join(__dirname, "../templates/partials");

//setup handlebars engine di lokasi folder views
app.set("view engine", "hbs");
app.set("views", direktoriViews);
hbs.registerPartials(direktoriPartials);
app.use(express.static(direktoriPublic));
//ini halaman/page utama

app.get("", (req, res) => {
  res.render("index", {
    judul: "Aplikasi Cek Cuaca",
    nama: "Whenny Zenica",
  });
});
//ini halaman bantuan/FAQ (Frequently Asked Questions)

app.get("/bantuan", (req, res) => {
  res.render("bantuan", {
    judul: "Halaman Bantuan",
    nama: "Whenny Zenica",
    teksBantuan: "ini adalah teks bantuan",
  });
});

app.get("/infoCuaca", (req, res) => {
  res.send([
    {
      prediksiCuaca: "Cerah",
      Lokasi: "Padang",
    },
  ]);
});

app.get("/tentang", (req, res) => {
  res.render("tentang", {
    judul: "Tentang Saya",
    nama: "Whenny Zenica",
  });
});

app.listen(4000, () => {
  console.log("server berjalan pada port 4000");
});

// Halaman 404 khusus untuk /bantuan/*
app.get("/bantuan/*", (req, res) => {
  res.render("404", {
    judul: "404",
    nama: "Whenny Zenica",
    pesanKesalahan: "Artikel yang dicari tidak ditemukan.",
  });
});

// Halaman 404 umum untuk semua rute lainnya
app.get("*", (req, res) => {
  res.render("404", {
    judul: "404",
    nama: "Whenny Zenica",
    pesanKesalahan: "Halaman tidak ditemukan.",
  });
});
