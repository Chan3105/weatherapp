const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'd59386325742d2c866abc49ad411f869';


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${Math.round((weather.main.temp -32)*5/9,2)}°C in ${weather.name}!`;
        let weatherTextExpanded = `It's ${Math.round((weather.main.temp -32)*5/9,2)} °C, with
          ${weather.main.humidity}% humidity in ${weather.name}!`;
        res.render('index', {weather: weatherTextExpanded, error: null});
      }
    }
  });
})

app.listen(8080, function () {
  console.log('The Weather App is live now!')
})
