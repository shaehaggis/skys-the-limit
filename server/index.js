const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
app.use(express.static(path.join(__dirname, "../client/build")));

const dbo = require("./db/conn");

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  dbo.connectToServer((err) => {
    if (err) {
      console.error(err);
    }
  });
  console.log(`Server listening on port ${PORT}`);
});
