'use strict';
var weatherData = require('../../weather/forecast');
var inputName;

exports.set_city_name = function(req, res) {
    module.exports.inputName = JSON.stringify(req.params.cityName);
};

exports.read_weather = function(req, res) {
    app.res.JSON(weatherData);
}