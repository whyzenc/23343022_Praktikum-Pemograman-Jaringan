const request = require("postman-request");
const urlCuaca =
  "http://api.weatherstack.com/current?access_key=242693bdb956564f9f7d9e3cce41ba7a&query=-0.8971109602511923,100.35069746686426";

request({ url: urlCuaca, json: true }, (error, response) => {
  if (error) {
    console.log("Terjadi kesalahan: " + error);
    return;
  }

  const temperature = response.body.current.temperature;
  const precip = response.body.current.precip;
  const weatherDescription = response.body.current.weather_descriptions[0]; // akses array

  console.log(
    `Saat ini cuaca: ${weatherDescription}. Suhu diluar mencapai ${temperature}°C. Kemungkinan terjadinya hujan adalah ${precip}%`
  );
});
