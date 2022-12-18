const { Client, Environment, ApiError } = require("square");

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { locationsApi } = client;

const getLocations = async () => {
  try {
    let listLocationsResponse = await locationsApi.listLocations();

    let locations = listLocationsResponse.result.locations;

    let returnedLocations = [];

    locations.forEach(function (location) {
      returnedLocations.push({
        id: location.id,
        name: location.name,
        address: location.address.addressLine1,
        locality: location.address.locality,
      });
    });
    return returnedLocations;
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach(function (e) {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
};

module.exports = getLocations;
