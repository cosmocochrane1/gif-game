const _ = require('lodash');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
var app = express();

app.use('/static', express.static(__dirname + '/public'));

//VIEWS SETUP
app.engine('.hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views'))

app.get('/', function (req, res) {
    res.render('mainmenu');
});

app.listen(3000);