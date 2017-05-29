var express = require('express'),
    multiparty = require('connect-multiparty'),
    consign = require('consign'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    expressValidator = require('express-validator');

var app = express();

// views is directory for all template files
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');


app.use(express.static(__dirname + '/app/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multiparty());

app.use(expressValidator());

consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});