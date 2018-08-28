const request = require("request");

const config = require("./config");

var geocodeAddress = address => {
  var encodedAddress = encodeURIComponent(address);
  const apiKey = config.googleKey;
  request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        console.log("Unable to connect to Google servers.");
      } else if (body.status === "ZERO_RESULTS") {
        console.log("Address not found.");
      } else if (body.status === "OK") {
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Lattitude: ${body.results[0].geometry.location.lat}`);
        console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
      }
    }
  );
};

module.exports = { geocodeAddress };
