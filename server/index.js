const express = require("express");
const path = require("path");
const cors = require("cors");
// const dbPool = require("./db/database");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));

app.use('/', require("./routes/database_items"));

app.use("/api", require("./routes/square"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
