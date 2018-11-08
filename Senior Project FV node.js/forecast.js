//this is the node.js port of the java forcast program.

let noodle = require('noodlejs');
var query = {
    url: 'http://google.com/search?q=javascript',
    type: 'html',
    selector: 'h3.r a',
    extract: 'text'
  },
  uriQuery = encodeURIComponent(JSON.stringify(query)),
  request  = 'http://example.noodlejs.com/?q=' +
             uriQuery + '&callback=?';

// Make Ajax request to Noodle server
jQuery.getJSON(request, function (data) {
  alert(data[0].results);
});
