const express = require("express");
const path = require("path");
const cors = require("cors");
// require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
<<<<<<< HEAD

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
=======
app.use(express.static(path.join(__dirname, "../client/build")));

app.use("/api", require("./routes/square"));
>>>>>>> bdab80f35f150746c2b53b6b37496364eae4f699

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
