# Jobsheet 9 -- Socket Programming

## Latihan

Melalui latihan pada Jobsheet 9 ini, saya memperoleh pengalaman praktis
dalam membangun aplikasi komunikasi real-time menggunakan konsep Socket
Programming berbasis WebSocket dengan bantuan library Socket.IO. Saya
mempelajari bagaimana client dan server dapat saling terhubung secara
langsung sehingga memungkinkan pertukaran data dua arah tanpa harus
melakukan request berulang seperti pada protokol HTTP konvensional.

Dengan mengimplementasikan aplikasi chat room, saya memahami mekanisme
komunikasi berbasis event (event-based communication) melalui penggunaan
`socket.on` dan `socket.emit`. Selain itu, saya mempelajari cara
mengelola pengguna dalam sebuah room, melakukan broadcast pesan ke
seluruh client yang berada dalam room yang sama, serta pemanfaatan
namespace dan room pada Socket.IO untuk memisahkan jalur komunikasi
antar kelompok pengguna.

------------------------------------------------------------------------

## Tugas

### 1. Perbandingan Implementasi `socket.on` pada Server dan Client

Tabel berikut menjelaskan perbedaan penerapan metode `socket.on` pada
sisi server dan client dalam aplikasi chat.

  -----------------------------------------------------------------------------------------------------------------
  Kriteria       Server (`src/index.js`)                                 Client (`public/js/chat.js`)
  -------------- ------------------------------------------------------- ------------------------------------------
  Platform       Node.js                                                 Browser

  Fungsi Utama   Mengelola event dari client, mengatur user, dan         Menerima event dari server dan memperbarui
                 mendistribusikan pesan                                  tampilan

  Event          `join`, `kirimPesan`, `kirimLokasi`, `disconnect`       `pesan`, `locationMessage`, `roomData`
  Ditangani                                                              

  Peran          Menjalankan logika bisnis dan validasi                  Merender data ke antarmuka

  Contoh         `socket.on("kirimPesan", (pesan, callback) => {...})`   `socket.on("pesan", (message) => {...})`
  Implementasi                                                           

  Operasi        Validasi input, broadcast pesan, manajemen user         Render template, update sidebar,
                                                                         auto-scroll

  Jenis Data     Data mentah dari client                                 Data terstruktur dari server

  Hasil Akhir    Mengirim event ke semua client dalam room               Menampilkan pesan dan lokasi di halaman
  -----------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------

### 2. Analisis Alur Data Melalui Console Browser

Berikut merupakan hasil pengamatan output console saat aplikasi chat
dijalankan.

  --------------------------------------------------------------------------------------------------------------------------------
  Output Console              Penyebab           Kode Terkait
  --------------------------- ------------------ ---------------------------------------------------------------------------------
  Objek pesan Admin           Client menerima    `socket.on("pesan", message => console.log(message))`
                              pesan sambutan     
                              dari server        

  Objek pesan user            Server melakukan   `socket.on("pesan", message => console.log(message))`
                              broadcast pesan ke 
                              room               

  Pesan konfirmasi            Callback           `socket.emit("kirimPesan", pesan, () => console.log("Pesan berhasil dikirim"))`
                              dijalankan setelah 
                              pesan diproses     
                              server             
  --------------------------------------------------------------------------------------------------------------------------------

**Urutan Proses:** 1. Client masuk ke room dan menerima pesan sambutan
dari server. 2. Client mengirim pesan ke server menggunakan
`socket.emit`. 3. Server memproses pesan dan mendistribusikannya ke
seluruh client dalam room. 4. Setiap client menerima event dan
menampilkan data pada console serta UI.

------------------------------------------------------------------------

### 3. Penjelasan Library pada `chat.html`

Aplikasi ini memanfaatkan beberapa library eksternal berikut:

#### Mustache

Digunakan sebagai template engine untuk merender HTML secara dinamis
berdasarkan data.

-   Fungsi utama: Mengisi variabel template dengan data aktual.
-   Contoh penggunaan: `Mustache.render(template, data)`.

#### Moment

Library untuk mengelola dan memformat data waktu.

-   Fungsi utama: Mengubah timestamp menjadi format waktu yang mudah
    dibaca.

#### Qs

Library untuk memproses query string pada URL.

-   Fungsi utama: Mengambil parameter `username` dan `room` saat client
    bergabung ke chat.

------------------------------------------------------------------------

### 4. Struktur Elements, Templates, dan Options pada `chat.js`

  -----------------------------------------------------------------------
  Komponen          Penjelasan                Keterkaitan
  ----------------- ------------------------- ---------------------------
  Elements          Referensi elemen DOM      `chat.html`
                    untuk interaksi           
                    JavaScript                

  Templates         Template Mustache untuk   `chat.html`
                    rendering pesan dan       
                    lokasi                    

  Options           Data `username` dan       `index.html` & `chat.html`
                    `room` hasil parsing URL  
  -----------------------------------------------------------------------

------------------------------------------------------------------------

### 5. Fungsi Modul `messages.js` dan `users.js`

  ------------------------------------------------------------------------
  Modul                 Fungsi                       Alur
  --------------------- ---------------------------- ---------------------
  messages.js           Membuat format pesan standar Server → Client → UI
                        (username, text, timestamp)  

  users.js              Mengelola data user (tambah, Server → Client →
                        ambil, hapus, list)          Sidebar
  ------------------------------------------------------------------------

------------------------------------------------------------------------

### 6. Mekanisme Pengiriman Lokasi

Fitur ini memungkinkan pengguna membagikan lokasi secara real-time.

**Alur Kerja:** 1. Browser mengambil koordinat menggunakan Geolocation
API. 2. Client mengirim koordinat ke server melalui socket. 3. Server
membentuk URL Google Maps dan melakukan broadcast. 4. Client menerima
dan menampilkan link lokasi di chat.

------------------------------------------------------------------------

### 7. Perbandingan `npm run start` dan `npm run dev`

#### npm run start

-   Menjalankan server menggunakan Node.js.
-   Tidak otomatis restart saat ada perubahan kode.
-   Digunakan untuk produksi.

#### npm run dev

-   Menggunakan Nodemon.
-   Server otomatis restart ketika file berubah.
-   Cocok untuk pengembangan.

------------------------------------------------------------------------

### 8. Metode Socket Lain yang Digunakan

  -----------------------------------------------------------------------
  Metode                         Fungsi
  ------------------------------ ----------------------------------------
  `socket.emit()`                Mengirim event

  `socket.broadcast.emit()`      Broadcast ke semua client kecuali
                                 pengirim

  `socket.join()`                Memasukkan user ke room

  `io.to().emit()`               Broadcast ke room tertentu

  `socket.on("disconnect")`      Menangani user keluar
  -----------------------------------------------------------------------

------------------------------------------------------------------------

### 9. Implementasi Komunikasi Real-time Dua Arah

Aplikasi chat ini menerapkan komunikasi dua arah berbasis event,
memungkinkan pertukaran data secara instan tanpa refresh halaman.

**Alur Implementasi:** 1. Client mengirim event ke server. 2. Server
memproses dan membalas event. 3. Client menerima event dan memperbarui
tampilan secara real-time.

Pendekatan ini menghasilkan aplikasi chat yang interaktif, responsif,
dan efisien.
