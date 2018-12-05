var getWeatherData = require('../../weather/forecast');
var inputName;

exports.read_weather = function(req, res) {
    inputName = req.query.cityName;
    console.log("inputName before getWeatherData is called: " + inputName);
    var data = getWeatherData(inputName);
    console.log("data controller received is: " + data);
    res.send(data);
};