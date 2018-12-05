//this is the node.js port of the java forcast program.

const request = require('superagent');

var inputName;
var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + inputName + "&APPID=8ed55356b0c310798b7216c27917e611";
var weatherData = "weatherData test value";
var requestError = "requestError test value";
var returnVal = "currently fucking broken";
var dataRetreivedSuccessfully = false;
var timerDone;
//console.log(inputName);
//console.log(urlToPass);

/*
var getWeather = new Promise(async (resolve, reject) => {
  let dataRetreivedSuccessfully = false;
  
  console.log("request has not yet run");

  request
  .get(urlToPass) // hopefully this allows it to use input for the city name
  .end((err, res) => {
    if(err){requestError = err; console.log("if statement in request has run");}
    else {
      weatherData = res.body;
      dataRetreivedSuccessfully = true;
      console.log("else statement in request has run");
    }
  });

  console.log("the request should have been run.");

  if(dataRetreivedSuccessfully) {
    resolve(weatherData);
    console.log("resolved");
  }
  if(!dataRetreivedSuccessfully) {
    reject(requestError);
    console.log("rejected");
  }
}); */
module.exports = function(cityName) {
  timerDone = false;
  setCityName(cityName);
  console.log("returnVal: " + returnVal);
  console.log("returnVal has yet to be changed.");
  setTimeout(returnValSetter, 1000);
  console.log("returnVal should have been changed");
  console.log("returnVal: " + returnVal);
  return returnVal;
};
function setCityName(cityName) {
  console.log("cityName: " + cityName);
  inputName = cityName;
  console.log("inputName: " + inputName);
  apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + inputName + "&APPID=8ed55356b0c310798b7216c27917e611";
  weatherDataRequester(apiUrl);
};
function weatherDataRequester(urlToPass) {
  console.log("urlToPass: " + urlToPass);
  request
  .get(urlToPass) // hopefully this allows it to use input for the city name 
  .end((err, res) => {
    if(err){
      console.log(err);
      dataRetreivedSuccessfully = false;
      console.log("an error has occurred");
    }
    else {
      weatherData = res.body;
      console.log("weatherData variable set to: " + JSON.stringify(weatherData));
      dataRetreivedSuccessfully = true;
      console.log("dataRetreivedSuccessfully: " + dataRetreivedSuccessfully);
    }
  });
};
function returnValSetter() {
  console.log("returnValSetter function has been run.");
  if(dataRetreivedSuccessfully){
    returnVal = weatherData;
    console.log("returnVal should be set to weatherData");
  }
  if(!dataRetreivedSuccessfully){
    returnVal = "an error has occurred";
    console.log("returnVal should be set to predefined error message");
  }
};

/* // this is the code that requests the weather data
request
  .get(urlToPass) // hopefully this allows it to use input for the city name 
  .end((err, res) => {
    if(err){console.log(err)}
    else {
      weatherData = res.body;
      dataRetreivedSuccessfully = true
    }
  });
*/

function keltofar(kelvin) {
  return Math.floor(kelvin * 9/5 - 459.67);
}
