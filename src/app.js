const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("../utils/geoCode");
const forecast = require("../utils/forecast");

// console.log(__dirname, __filename);
// console.log(path.join(__dirname, "../public/index.html"));

const app = express();
const port = process.env.PORT || 3000;

// Setup static dirs
app.use(express.static(path.join(__dirname, "../public/")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("", (req, res) => {
  res.render("index", {
    header: "Main",
    title: "Weather App",
    name: "Vignesh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    header: "Help",
    sentence: "This is the help sentence",
    name: "Vignesh",
    title: "Help",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    header: "About",
    who: "Vignesh",
    name: "Vignesh",
    title: "About",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address found",
    });
  }
  console.log(req.query);

  geoCode(req.query.address.toString(), (err, { lat, long, location } = {}) => {
    if (err) {
      console.log(err);
      return res.send({ error: err });
    } else {
      // console.log(data);
      forecast(lat, long, (error, forecastdata) => {
        if (error) {
          console.log(error);
          return res.send({ error });
        } else {
          console.log({ lat, long, location, ...forecastdata });
          return res.send({ lat, long, location, ...forecastdata });
          // console.log(forecastdata);
        }
      });
    }
  });

  // res.send({
  //   header: "Weather",
  //   forecast: 40,
  //   location: "Chennai",
  //   name: "Vignesh",
  //   title: "weather",
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      message: "No Search found",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404Page", {
    header: 404,
    errorMessage: "Help Article Not found!",
    name: "Vignesh",
    title: "404",
  });
});

app.get("*", (req, res) => {
  res.render("404Page", {
    header: 404,
    errorMessage: "Page Not found!",
    name: "Vignesh",
    title: "404",
  });
});

app.listen(port, () => {
  console.log("Running on 3000");
});
