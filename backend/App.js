const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config;
const shipmentRoutes = require("./routes/shipment-routes")

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/shipment", shipmentRoutes);

mongoose
  .connect(process.env.CONNECT_MONGODB)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
