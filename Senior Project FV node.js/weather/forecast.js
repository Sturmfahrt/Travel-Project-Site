//this is the node.js port of the java forcast program.

const request = require('superagent');

var inputName = require('../api/controllers/weatherController');
var urlToPass = "http://api.openweathermap.org/data/2.5/weather?q=" + inputName + "&APPID=8ed55356b0c310798b7216c27917e611";
var weatherData;
//console.log(inputName);
//console.log(urlToPass);

request
  .get(urlToPass) /* hopefully this allows it to use input for the city name */
  .end((err, res) => {
    if(err){console.log(err)}
    else {
      module.exports.weatherData = JSON.stringify(res.body);
      console.log('exported weather data');
    }
  });

function keltofar(kelvin) {
  return Math.floor(kelvin * 9/5 - 459.67);
}
