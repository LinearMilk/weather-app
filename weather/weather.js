const request = require("request");

const config = require("../config");

var getWeather = (latitude, longitude, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/${
        config.darkSkiesKey
      }/${latitude},${longitude}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        callback("Unable to fetch weather");
      }
    }
  );
};

module.exports.getWeather = getWeather;
