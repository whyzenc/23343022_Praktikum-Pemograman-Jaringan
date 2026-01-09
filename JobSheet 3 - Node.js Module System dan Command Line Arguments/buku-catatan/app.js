// A. Node.js module system
/*
// a. Import core module node.js
const fs = require("fs");
//fs.writeFileSync("catatan.txt", "Nama Saya Whenny Zenica,");
fs.appendFileSync("catatan.txt", " Saya kuliah di Universitas Negeri Padang");
*/

/*
// b. Import file pada node.js
const catatan = require('./catatan.js') 
const pesan = catatan() 
console.log(pesan)
*/

/*
// c7
const validator = require('validator')
const ambilCatatan = require('./catatan.js') 
const pesan = ambilCatatan() 
console.log(pesan) 
console.log(validator.isURL('https://whenyzenica.com'))
*/

/*
// d. latihan 1
const chalk = require('chalk');
console.log(chalk.blue('Print warna biru sukses'));
console.log(chalk.red('Print warna merah sukses'));
console.log(chalk.yellow('Print warna kuning sukses'));
*/

// B. Command line argument
/*
const ambilCatatan = require('./catatan.js') 
const command = process.argv[5] 
console.log(process.argv[2]) 

if (command === 'tambah') { 
    console.log('Tambah Catatan') 
} else if (command === 'hapus') { 
    console.log('Hapus Catatan') 
} 
*/

// YARGS
const { hideBin } = require("yargs/helpers");
const yargsFactory = require("yargs/yargs");
const catatan = require("./catatan.js");

// buat instance yargs
const yargs = yargsFactory(hideBin(process.argv));
yargs.version("10.1.0");

// Membuat perintah (command) 'tambah'
yargs.command({
  command: "tambah",
  describe: "tambah sebuah catatan baru",
  builder: {
    judul: {
      describe: "Judul catatan",
      demandOption: true,
      type: "string",
    },
    isi: {
      describe: "Isi catatan",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    catatan.tambahCatatan(argv.judul, argv.isi);
  },
});

// Perintah hapus
yargs.command({
  command: "hapus",
  describe: "hapus catatan",
  builder: {
    judul: {
      describe: "Judul catatan yang akan dihapus",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    catatan.hapusCatatan(argv.judul);
  },
});

// Perintah list
yargs.command({
  command: "list",
  describe: "Menampilkan semua catatan",
  handler: function () {
    catatan.listCatatan();
  },
});

// Perintah read
yargs.command({
  command: "baca",
  describe: "Membaca sebuah catatan berdasarkan judul",
  builder: {
    judul: {
      describe: "Judul catatan yang ingin dibaca",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    catatan.bacaCatatan(argv.judul);
  },
});

// letakan bagian ini pada baris terakhir
yargs.parse();
