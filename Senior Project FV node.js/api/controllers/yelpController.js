var term;
var loca;
var cost;
var final;
var doneGettingAnswer = true;
const apiKey = 'o-Jyuwf5wA67Pnsnz6SbYsXaq5C7hPP1IODAJxoLrMVseBzSNbv1ANN9B5Jz1OKltC3xJA5G6tJotSOwrLfK4otUXMr26DGCRsQz7f-YspBvUu-j_NsWTCkJQ4TsW3Yx';
const yelp = require('yelp-fusion');
const client = yelp.client(apiKey);
const readline = require('readline-sync');
var rp = require('request-promise');

exports.get_info = function(req, res) {
    term = req.query.term;
    loca = req.query.location;
    cost = req.query.cost;

    //getAnswer(term, loca, cost); 

    function getAnswer(term, loca, cost) {

        if(cost != null) {
          console.log("Checking price...");
          switch(cost) {
            case "$":
            cost = 1;
            break;
        
            case "$$":
            cost = 2;
            break;
        
            case "$$$":
            cost = 3;
            break;
        
            case "$$$$":
            cost = 4;
            break;
        
            default:
            cost = 0;
          }
        
        }
        console.log("Setting search request...");
          var searchRequest;
        
        if(cost != null) {
          console.log("Search request with price");
          searchRequest = { // search terms
            term: term,
            location: loca,
            sort_by: 'rating',
            price: cost
          };
        } else {
          console.log("Search request without price");
          searchRequest = { // search terms
            term: term,
            location: loca,
            sort_by: 'rating'
          };
        }
        console.log("Calling the function");
      
        return doTheShit(loca, term, searchRequest);
    }
      
    function doTheShit(loca, term, searchRequest) {
      
        client.search(searchRequest).then(response => {
      
          console.log("Here are the best businesses for '" + term + "' around '"+loca+"'");
        
          for(var k = 0; k <= 10; k++) {
              console.log(response.jsonBody.businesses[k].name + " in " + response.jsonBody.businesses[k].location.city + ", " + response.jsonBody.businesses[k].location.state );
              final = {
                  name: response.jsonBody.businesses[k].name,
                  locationCity: response.jsonBody.businesses[k].location.city,
                  locationState: response.jsonBody.businesses[k].location.state
              }
          }
        })
        .catch(e => {
          console.log(e);
        });
        console.log('final is: ');
        console.log(JSON.stringify(final));
        res.send(JSON.stringify(final));
    }

    var options = {
      method: 'GET',
      uri: 'https://api.yelp.com/v3/businesses/search',
      qs: {
          term: term,
          location: loca,
          cost: cost
      },
      headers: {
          'User-Agent': 'Request-Promise',
          'authorization': 'bearer '+ apiKey
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
} 
