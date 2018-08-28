const request = require("request");
const yargs = require("yargs");

const geocode = require("./geocode/geocode");
const config = require("./config");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(JSON.stringify(results, undefined, 2));
  }
});

request(
  {
    url: `https://api.darkskynet/forecast/${
      config.darkSkiesKey
    }/59.2986114,17.9888209`,
    json: true
  },
  (error, response, body) => {
    if (error) {
      console.log("Unable to connect to Dark Skies server.");
    } else if (body.code === "400") {
      console.log("The given location is invalid.");
    } else {
      console.log(`Temperature: ${body.currently.temperature}`);
    }
  }
);
