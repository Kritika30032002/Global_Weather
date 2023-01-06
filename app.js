const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const path = require("path");
require('dotenv').config()
const timeObject = require('./public/scripts/time');


/* ---------------------------- Basic Connections --------------------------- */
const app = express();

/* ----------------------------- Set View Engine ---------------------------- */
app.set('view engine', 'pug');

/* ---------------------------- Set Views Folder ---------------------------- */
app.set('views', path.join(__dirname, 'src', 'views'));

/* ---------------------------- Set Static Folder --------------------------- */
app.use(express.static(path.join(__dirname, 'public')));



/* ---------------------------- Setting up CSS/JS Files --------------------------- */
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));


/* ---------------------------- Body Parser Setup --------------------------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


/* ---------------------------- Basic Routes --------------------------- */
app.get("/", function (req, res,) {
  res.render('index', { title: "Global_Weather | Home", time: timeObject.time, dayMethod: timeObject.dayMethod, day: timeObject.day, today: timeObject.today });
});

app.get("/about", function (req, res,) {
  res.render('index', { title: "Global_Weather | About" });
});

app.get("*", function (req, res) {
  res.render('index', { title: "Global_Weather | Error" });
});


app.post("/", function (req, res) {
  const query = req.body.cityName
  const apiKey = process.env.apiKey;
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&callback" + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function (response) {
    console.log(response.statusCode);

    if (response.statusCode === 200) {
      response.on("data", function (data) {
        const weatherData = JSON.parse(data)

        const weatherDescription = {
          temp: weatherData.main.temp,
          feels_like: weatherData.main.feels_like,
          humidity: weatherData.main.humidity,
          pressure: weatherData.main.pressure,
          wind: weatherData.wind.speed,
          weatherDesc: weatherData.weather[0].description.toUpperCase(),
          weatherMain: weatherData.weather[0].main.toUpperCase(),
          icon: weatherData.weather[0].icon,
          imageURL: "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png",
          name: weatherData.name.toUpperCase(),
          country: weatherData.sys.country,
        }

        res.render('index', { title: "Global_Weather | Result", temp: weatherDescription.temp, feels_like: weatherDescription.feels_like, humidity: weatherDescription.humidity, pressure: weatherDescription.pressure, wind: weatherDescription.wind, weatherDesc: weatherDescription.weatherDesc, weatherMain: weatherDescription.weatherMain, icon: weatherDescription.icon, imageURL: weatherDescription.imageURL, name: weatherDescription.name, country: weatherDescription.country })
      })


    } else {
      console.log("Error");
      res.render('error')
    }

  })
});




/* ---------------------------- Server Listening --------------------------- */
app.listen(3000, function () {
  console.log("Server is running on port 3000.");
})



// response.on("data", function (data) {
//   const weatherData = JSON.parse(data)

//   const temp = weatherData.main.temp;
//   const weatherDescription = weatherData.weather[0].description;
//   const icon = weatherData.weather[0].icon;
//   const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
//   res.write("<p>The weather is currently " + weatherDescription + " </p>");
//   res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
//   res.write("<img src=" + imageURL + ">");

//   res.send()
// })