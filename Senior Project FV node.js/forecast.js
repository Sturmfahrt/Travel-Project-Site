//this is the node.js port of the java forcast program.

let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

axios.get('https://dev.to/aurelkurtula')
    .then((response) => {
        if(response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            let devtoList = [];
            $('.single-article').each(function(i, elem) {
                devtoList[i] = {
                    title: $(this).find('h3').text().trim(),
                    url: $(this).children('.index-article-link').attr('href'),
                    tags: $(this).find('.tags').text().split('#')
                          .map(tag =>tag.trim())
                          .filter(function(n){ return n != "" })
                }
            });
    }
}, (error) => console.log(err) );
