//this is the node.js port of the java forcast program.
const async = require('async');
const request = require('superagent');

var inputName;
var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + inputName + "&APPID=8ed55356b0c310798b7216c27917e611";
var returnVal = null;
var weatherData = "weatherData test value";
var requestError = null;
var dataRetreivedSuccessfully = false;

module.exports = function(cityName) {
  inputName = cityName;
  async.waterfall([
    setInput,
    weatherDataRequester,
    returnValSetter,
  ], function (requestError, result) {
    if(requestError != null){
      console.log(requestError);
      console.log("error has occurred during async waterfall execution.");
    };
  });
  console.log("return value is: ");
  console.log(returnVal);
  console.log("returning returnVal")
  return returnVal;
};

function setInput(done) {
  console.log("inputName: " + inputName);
  apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + inputName + "&APPID=8ed55356b0c310798b7216c27917e611";
  done(null, apiUrl);
};
async function weatherDataRequester(urlToPass) {
  var errTemp;
  var resTemp;
  console.log("urlToPass: " + urlToPass);
  request
  .get(urlToPass) // hopefully this allows it to use input for the city name 
  .end((err, res) => {
    errTemp = err;
    resTemp = res;
  });
  function decision1SecDelay() {
    return new Promise(resolve => {
      setTimeout(() => {
        var temp;
        if(errTemp){
          console.log(errTemp);
          requestError = errTemp;
          dataRetreivedSuccessfully = false;
          console.log("an error has occurred");
        }
        else {
          temp = resTemp.body;
          console.log("weatherData variable set to: " + JSON.stringify(temp));
          requestError = null;
          dataRetreivedSuccessfully = true;
          console.log("dataRetreivedSuccessfully: " + dataRetreivedSuccessfully);
        }
        resolve(temp);
      }, 1000);
    });
  };
  weatherData = await decision1SecDelay();
  return(requestError);
};
async function returnValSetter(callback) {
  console.log("returnValSetter function has been run.");
  if(dataRetreivedSuccessfully){
    returnVal = weatherData;
    console.log("returnVal should be set to weatherData");
  }
  if(!dataRetreivedSuccessfully){
    returnVal = "an error has occurred";
    console.log("returnVal should be set to predefined error message");
  }
  callback(null, returnVal);
};

function keltofar(kelvin) {
  return Math.floor(kelvin * 9/5 - 459.67);
}
