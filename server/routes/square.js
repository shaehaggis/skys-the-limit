const express = require("express");
const router = express.Router();

const getLocations = require("../api/locations");
const makePayment = require("../api/pay");

router.get("/locations", async (req, res) => {
  const data = await getLocations();
  const location = `${data[0].id}: ${data[0].name}, ${data[0].address}, ${data[0].locality}`;
  res.status(200).json({ msg: location });
});

router.post("/payment", async (req, res) => {
  const response = await makePayment(req.body);
  console.log(response);
  res.status(200).json({ msg: "Successful" });
});

module.exports = router;
