const { Client, Environment, ApiError } = require("square");
const { randomUUID } = require("crypto");

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { paymentsApi } = client;

const makePayment = async (data) => {
  try {
    let paymentResponse = await paymentsApi.createPayment({
      sourceId: data.token,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: data.amount,
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
