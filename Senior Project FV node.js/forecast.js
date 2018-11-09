//this is the node.js port of the java forcast program.

const request = require('superagent');

request
  .get('http://api.openweathermap.org/data/2.5/weather?q=Miami&APPID=8ed55356b0c310798b7216c27917e611')
  .end((err, res) => {
    if(err){console.print(err)}
    else {
      console.log("Weather in " + res.body.name + " is: " + res.body.weather[0].description );
      console.log("Temperature in " + res.body.name + " is: " + keltofar(res.body.main.temp) + " Degrees" );
    }
  });

function keltofar(kelvin) {
  return Math.floor(kelvin * 9/5 - 459.67);
}
