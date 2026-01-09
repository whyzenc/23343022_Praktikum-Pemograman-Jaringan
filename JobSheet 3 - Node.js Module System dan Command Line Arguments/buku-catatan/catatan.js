// Import module bawaan Node.js dan chalk
const fs = require("fs");
const chalk = require("chalk");

// Fungsi ambilCatatan
const ambilCatatan = function () {
  return "Ini Catatan Randi Proska...";
};

// Fungsi untuk menambah catatan baru
const tambahCatatan = function (judul, isi) {
  const catatan = muatCatatan();
  const catatanGanda = catatan.filter(function (note) {
    return note.judul === judul; // ✅ gunakan 'judul', bukan 'title'
  });

  if (catatanGanda.length === 0) {
    catatan.push({
      judul: judul,
      isi: isi,
    });
    simpanCatatan(catatan);
    console.log(chalk.green.inverse("Catatan baru ditambahkan!"));
  } else {
    console.log(chalk.red.inverse("Judul catatan telah dipakai!"));
  }
};

// Fungsi untuk menyimpan catatan ke file catatan.json
const simpanCatatan = function (catatan) {
  const dataJSON = JSON.stringify(catatan);
  fs.writeFileSync("catatan.json", dataJSON);
};

// Fungsi untuk memuat catatan dari file catatan.json
const muatCatatan = function () {
  try {
    const dataBuffer = fs.readFileSync("catatan.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// Fungsi untuk menghapus catatan berdasarkan judul
const hapusCatatan = function (judul) {
  const catatan = muatCatatan();
  const catatanUntukDisimpan = catatan.filter(function (note) {
    return note.judul !== judul;
  });

  if (catatan.length > catatanUntukDisimpan.length) {
    console.log(chalk.green.inverse("Catatan dihapus!"));
    simpanCatatan(catatanUntukDisimpan);
  } else {
    console.log(chalk.red.inverse("Catatan tidak ditemukan!"));
  }
};

// 🆕 Fungsi untuk menampilkan semua catatan (list)
const listCatatan = function () {
  const catatan = muatCatatan();
  console.log(chalk.inverse("Daftar Catatan Anda:"));
  catatan.forEach((note) => {
    console.log("- " + note.judul);
  });
};

// 🆕 Fungsi untuk membaca isi catatan berdasarkan judul
const bacaCatatan = function (judul) {
  const catatan = muatCatatan();
  const note = catatan.find((note) => note.judul === judul);

  if (note) {
    console.log(chalk.inverse(note.judul));
    console.log(note.isi);
  } else {
    console.log(chalk.red.inverse("Catatan tidak ditemukan!"));
  }
};

// Ekspor semua fungsi agar bisa digunakan di app.js
module.exports = {
  ambilCatatan,
  tambahCatatan,
  hapusCatatan,
  listCatatan,
  bacaCatatan,
};
