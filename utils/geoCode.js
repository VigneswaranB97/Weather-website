const request = require("request");

const geoCode = (address, callback) => {
  const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?limit=1&access_token=pk.eyJ1IjoidmlnbmVzd2FyYW5iOTciLCJhIjoiY2tpdWdzdmhvMGFpbTMzbXdydzZraWJhYiJ9.Qk1TyIO5uQpgu6UOJwF4mA`;

  request({ url: geoCodingUrl, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to internet.");
    } else if (!body.features.length) {
      callback("Enter correct details");
    } else {
      // console.log(body.features);
      const lat = body.features[0].center[1];
      const long = body.features[0].center[0];
      // console.log(`Latitude: ${lat}, Longitude: ${long}`);
      callback(undefined, {
        lat,
        long,
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
