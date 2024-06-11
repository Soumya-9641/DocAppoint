const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", proxy("http://localhost:9000"));
app.use("/appoinment", proxy("http://localhost:9001"));


app.listen(8005, () => {
  console.log("Gateway is Listening to Port 8005");
});