//this is the node.js port of the java forcast program.

const request = require('superagent');

var inputName = process.argv.slice(2);
var urlToPass = "http://api.openweathermap.org/data/2.5/weather?q=" + inputName + "&APPID=8ed55356b0c310798b7216c27917e611";
console.log(inputName);
console.log(urlToPass);

request
  .get(urlToPass) /* hopefully this allows it to use input for the city name */
  .end((err, res) => {
    if(err){console.log(err)}
    else {
      console.log("Weather in " + res.body.name + " is: " + res.body.weather[0].description );
      console.log("Temperature in " + res.body.name + " is: " + keltofar(res.body.main.temp) + " Degrees" );
    }
  });

function keltofar(kelvin) {
  return Math.floor(kelvin * 9/5 - 459.67);
}
