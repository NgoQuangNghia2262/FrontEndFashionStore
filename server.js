import cheerio from "cheerio";
import { User } from "./src/fetchData/user.js";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
dotenv.config();
const port = process.env.PORT || 8001;

const app = express();

app.use(express.static("src"));
app.use(cookieparser());

const sendfileindex = (req, res, next) => {
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
app.get(
  "/dashboard",
  (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.redirect("/login");
    }
    next();
  },
  sendfileindex
);
app.get("/dashboard/listproduct", sendfileindex);
app.get("/pos_v1", sendfileindex);

app.get("/get_html_elle_vn", async (req, res) => {
  const targetUrl = "https://www.elle.vn/thoi-trang/tin-thoi-trang";
  try {
    const response = await fetch(targetUrl);
    const html = await response.text();
    res.send(html);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log("running on localhost:" + port);
});
