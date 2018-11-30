'use strict';

const yelp = require('yelp-fusion');
const readline = require('readline-sync');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'o-Jyuwf5wA67Pnsnz6SbYsXaq5C7hPP1IODAJxoLrMVseBzSNbv1ANN9B5Jz1OKltC3xJA5G6tJotSOwrLfK4otUXMr26DGCRsQz7f-YspBvUu-j_NsWTCkJQ4TsW3Yx';


var term = readline.question("Please enter a search term: ");
var loca = readline.question("Please enter a location: ");
var answ = readline.question("Is this location a restaurant?: ");
if(answ.toLocaleUpperCase() == "YES") {
  var moneys = readline.question("Enter the price range $, $$, $$$, $$$$: ");

  switch(moneys) {
    case "$":
    moneys = 1;
    break;

    case "$$":
    moneys = 2;
    break;

    case "$$$":
    moneys = 3;
    break;

    case "$$$$":
    moneys = 4;
    break;

    default:
    moneys = 0;
  }

}
console.log("");
  var searchRequest = null;

if(answ.toLocaleUpperCase() == "YES") {
  searchRequest = { // search terms
    term: term,
    location: loca,
    sort_by: 'rating',
    price: moneys
  };
} else {
  searchRequest = { // search terms
    term: term,
    location: loca,
    sort_by: 'rating'
  };
}


const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {

  console.log("Here are the best businesses for '" + term + "' around '"+loca+"'");

  for(var k = 0; k <= 10; k++) {
      console.log(response.jsonBody.businesses[k].name + " in " + response.jsonBody.businesses[k].location.city + ", " + response.jsonBody.businesses[k].location.state );
  }

}).catch(e => {
  //console.log(e);
});
