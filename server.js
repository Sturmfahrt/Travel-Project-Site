const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/static'));

const server = app.listen(80, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/login', (req, res) => {
    res.render('login');
});