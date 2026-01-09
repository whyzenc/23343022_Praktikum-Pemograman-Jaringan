const request = require("postman-request");

// Nama lokasi yang ingin dicari
const lokasi = "Padang"; // ✅ tambahkan variabel ini

// URL Mapbox API untuk mendapatkan koordinat
const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
  lokasi
)}.json?access_token=pk.eyJ1IjoicmlkaG9oYW1kYW5pIiwiYSI6ImNtaDZhZmZtNjA3aXoyam9qMDV2YWdtdmsifQ.U6_nc6sQH2xFx2xgEhjtfQ&limit=1`;

// Memanggil Mapbox API
request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    return console.log("❌ Tidak dapat terhubung ke layanan geocoding!");
  }

  if (!response.body.features || response.body.features.length === 0) {
    return console.log("⚠️ Lokasi tidak ditemukan!");
  }

  const dataLokasi = response.body.features[0];
  const latitude = dataLokasi.center[1];
  const longitude = dataLokasi.center[0];
  const placeName = dataLokasi.place_name;
  const placeType = dataLokasi.place_type[0];

  console.log(`Koordinat lokasi anda adalah ${latitude}, ${longitude}`);
  console.log(`Data yang anda cari adalah: ${lokasi}`);
  console.log(`Data yang ditemukan adalah: ${placeName}`);
  console.log(`Tipe lokasi adalah: ${placeType}`);

  // URL Weatherstack API untuk mendapatkan data cuaca berdasarkan koordinat
  const weatherURL = `http://api.weatherstack.com/current?access_key=242693bdb956564f9f7d9e3cce41ba7a&query=${latitude},${longitude}&units=m`;

  // Memanggil Weatherstack API
  request({ url: weatherURL, json: true }, (error, response) => {
    if (error) {
      return console.log("❌ Tidak dapat terhubung ke layanan cuaca!");
    }

    if (response.body.error) {
      return console.log(
        "⚠️ Terjadi kesalahan API cuaca:",
        response.body.error.info
      );
    }

    const suhu = response.body.current.temperature;
    const hujan = response.body.current.precip;

    console.log(`Saat ini suhu di ${lokasi} mencapai ${suhu} derajat celcius.`);
    console.log(`Kemungkinan terjadinya hujan adalah ${hujan}%`);
  });
});
