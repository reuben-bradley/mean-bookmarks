/* 
 * Main application logic.
 * 
 * @author Reuben Bradley <reuben.m.bradley@gmail.com>
 */

// Import the pieces that we need
var express = require('express');
var handlebars = require('express-handlebars');
var routes = require('./routes/index');
var MongoClient = require('mongodb').MongoClient;

var CONFIG = require('./config');
var dbConfig = CONFIG.db[CONFIG.env];
var db;

// Connect to the database
var connectString = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + 
        '/' + dbConfig.database;
MongoClient.connect(connectString, function( err, database ) {
    if ( err ) {
        return console.log(err);
    }
    console.log(dbConfig);
    db = database;
});

var handlebarsConfig = {
    extname: '.hbs',
    defaultLayout: 'default'
};

// Define the app
var app = express();
app.engine('hbs', handlebars(handlebarsConfig));
app.set('view engine', 'hbs');
app.use(function( req, res, next ) {
    // Set the database so it's usable on every request
    req.db = db;
    next();
});

// Import the routes
app.use('/', routes);

process.on('exit', function() {
    if ( db ) {
        db.close();
    }
});

module.exports = app;
