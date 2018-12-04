'use strict';
var weatherData = require('../../weather/forecast');
var inputName;

exports.set_city_name = function(req, res) {
    module.exports.inputName = req.body.cityName;
};

exports.read_weather = function(req, res) {
    weatherData.getWeather.then( (message) => {
        res.send(message);
    });
};