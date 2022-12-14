const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const path = require("path");
require('dotenv').config()

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))

// Body Parsar Middlware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function (req, res,) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

  const query = req.body.cityName
  const apiKey = process.env.apiKey;
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function (response) {
    // console.log(response);
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data)
      // console.log(weatherData);

      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<p>The weather is currently " + weatherDescription + " </p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">");

      res.send()
    })
  })
});




app.listen(3000, function () {
  console.log("Server is running on port 3000.");
})