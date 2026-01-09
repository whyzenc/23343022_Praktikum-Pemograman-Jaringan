const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/prediksiCuaca");

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

app.get("/infocuaca", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Kamu harus memasukkan lokasi yang ingin dicari",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, dataPrediksi) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          prediksiCuaca: dataPrediksi,
          lokasi: location,
          address: req.query.address,
        });
      });
    }
  );
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

const beritaAPI = require("./utils/beritaAPI");

// 🔹 Halaman Berita
app.get("/berita", (req, res) => {
  res.render("berita", {
    judul: "Berita Terkini",
    nama: "Whenny Zenica",
  });
});

// 🔹 Endpoint API untuk fetch berita
app.get("/api/berita", (req, res) => {
  beritaAPI((error, data) => {
    if (error) {
      return res.send({ error });
    }
    res.send(data);
  });
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
