const request = require("request");

const forecast = (lon, lat, callback) => {
  const forecastUrl = `http://api.weatherstack.com/current?access_key=7d5a849b66a37c8632c2cf7588c3052f&query=${
    encodeURIComponent(lat) + "," + encodeURIComponent(lon)
  }&units=f`;

  request({ url: forecastUrl, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to internet.");
    } else if (body.error) {
      callback("Enter correct details");
    } else {
      const data = body;
      //   console.log(data);
      //   console.log(data.current);
      //   console.log(
      //     `${data.current.temperature} degree. Prob: ${data.current.precip}. Weather Discription: ${data.current.weather_descriptions[0]}`
      //   );
      callback(undefined, {
        temp: data.current.temperature,
        probability: data.current.precip,
        weather: data.current.weather_descriptions[0],
      });
    }
  });
};

module.exports = forecast;
