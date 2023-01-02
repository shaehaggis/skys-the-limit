const { Client, Environment, ApiError } = require("square");
const { randomUUID } = require("crypto");
const pool = require('../db/database');

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { paymentsApi } = client;

const makePayment = async (data) => {
  console.log(data);

  //get the price of each item

  //get the price of each item, and add the cost of each ingredient, and remove the cost of each removed ingredient
  

  try {
    let paymentResponse = await paymentsApi.createPayment({
      sourceId: data.token,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: 100,
        currency: "AUD",
      },
    });
    return paymentResponse;
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

module.exports = makePayment;
