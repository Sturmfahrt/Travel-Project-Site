var rp = require('request-promise');

exports.read_weather = function(req, res) {
    var inputName = req.query.cityName;
    var options = {
        method: 'GET',
        uri: 'http://api.openweathermap.org/data/2.5/weather',
        qs: {
            q: inputName,
            APPID: '8ed55356b0c310798b7216c27917e611'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };
    rp(options)
        .then(function (body) {
         console.log('data retreived');
         console.log(body);
         res.send(body);
        })
        .catch(function (err) {
         console.log('error has occured');
         console.log(err);
         res.send(err);
        });
};