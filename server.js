const express = require("express");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 8001;

const app = express();

app.use(express.static("src"));

const sendfileindex = (req, res) => {
  res.sendFile(path.resolve("src", "index.html"));
};

app.get("/", sendfileindex);
app.get("/product", sendfileindex);
app.get("/register", sendfileindex);
app.get("/login", sendfileindex);
app.get("/cart", sendfileindex);
app.get("/profile", sendfileindex);
app.get("/product/category", sendfileindex);
app.get("/payment", sendfileindex);
app.get("/dashboard", sendfileindex);
app.get("/dashboard/listproduct", sendfileindex);
app.get("/pos_v1", sendfileindex);

app.listen(port, () => {
  console.log("running on localhost:" + port);
});
