const request = require("request");

const config = require("../config");

var geocodeAddress = address => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);
    const apiKey = config.googleKey;
    request(
      {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject("Unable to connect to Google servers.");
        } else if (body.status === "ZERO_RESULTS") {
          reject("Address not found.");
        } else if (body.status === "OK") {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        }
      }
    );
  });
};

geocodeAddress("19146").then(
  location => {
    console.log(JSON.stringify(location, undefined, 2));
  },
  errorMessage => {
    console.log(errorMessage);
  }
);
