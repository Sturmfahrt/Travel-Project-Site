var weatherData = require('../../weather/forecast');
var inputName;

exports.read_weather = function(req, res) {
    module.exports.inputName = req.params.cityName;
    console.log("weatherData promise is about to be called");
    weatherData.then( (message) => {
        console.log("weatherData promise has been called.");
        res.send(message);
    })
    .catch(function(error){
        console.log("weatherData promise has been called. catch statement");
        console.error(error);
      });
};