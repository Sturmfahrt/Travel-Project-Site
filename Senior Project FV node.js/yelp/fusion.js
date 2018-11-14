'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'o-Jyuwf5wA67Pnsnz6SbYsXaq5C7hPP1IODAJxoLrMVseBzSNbv1ANN9B5Jz1OKltC3xJA5G6tJotSOwrLfK4otUXMr26DGCRsQz7f-YspBvUu-j_NsWTCkJQ4TsW3Yx';

const searchRequest = {
  term:'North India Restaurant',
  location: 'san francisco, ca'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  //const firstResult = response.jsonBody.businesses[0];
  //const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(response.body.name);
  console.log("The " + response.body.name + " is in " + response.body.city + ", " + response.body.state );
}).catch(e => {
  console.log(e);
});
