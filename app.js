var express = require('express'),
    multiparty = require('connect-multiparty'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator');

var consign = require('consign');
var app = express();
//var http = require('http').Server(app);

// views is directory for all template files
app.set('view engine', 'ejs');
app.set('views', './app/views');


app.use(express.static('./app/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multiparty());

app.use(expressValidator());

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

//app.set('port', (process.env.PORT || 5000));
var port = process.env.PORT || 8000;

app.listen(port, function() {
    console.log("App is running on port " + port);
});

/*
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
*/