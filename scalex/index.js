const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const tokenRoutes = require("./routes/tokens.routes");
require("dotenv").config();
const uri = process.env.APP_URL;

app.use(cors());
app.use(express.json());
app.use("/tokens", tokenRoutes);
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("Hello from the app");
});
app.listen(3000, () => {
  console.log("server running on port 3000");
});

mongoose
  .connect(`${uri}`)
  .then(() => {
    console.log("connected to mongodb atlas");
  })
  .catch((e) => {
    console.error(e);
  });
