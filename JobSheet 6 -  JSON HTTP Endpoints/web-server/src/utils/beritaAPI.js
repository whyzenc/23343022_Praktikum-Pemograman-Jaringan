const request = require("postman-request");

const beritaAPI = (callback) => {
  const apiKey = "6a02a9f8d830e251cc7066bf5efa9ed5";
  const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=indonesia&limit=5`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Tidak dapat terhubung ke layanan berita", undefined);
    } else if (response.body.error) {
      callback("Gagal memuat data berita", undefined);
    } else {
      const articles = response.body.data.map((item) => ({
        title: item.title,
        description: item.description,
        source: item.source,
      }));
      callback(undefined, articles);
    }
  });
};

module.exports = beritaAPI;
