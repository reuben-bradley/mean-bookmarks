/* 
 * Main application logic.
 * 
 * @author Reuben Bradley <reuben.m.bradley@gmail.com>
 */

// Import the pieces that we need
var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
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
    db = database;
    // TODO: Import password from "secrets" file!
    db.authenticate(dbConfig.user, dbConfig.password);
});

var handlebarsConfig = {
    extname: '.hbs',
    defaultLayout: 'default'
};

// Define the app
var app = express();
app.engine('hbs', handlebars(handlebarsConfig));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function( req, res, next ) {
    // Set the database so it's usable on every request
    req.db = db;
    next();
});
app.getDB = function() {
    return db;
};

// Setup the static serve route
app.use('/build', express.static('./build', { index: false }));

// Import the routes
app.use('/', routes);

process.on('SIGHUP', function() {
    console.log('Received SIGHUP. Shutting down ...');
    process.exit();
});

process.on('SIGINT', function() {
    console.log('Received SIGINT. Shutting down ...');
    process.exit();
});

process.on('SIGTERM', function() {
    console.log('Received SIGTERM. Shutting down ...');
    process.exit();
});

process.on('uncaughtException', function( err ) {
    console.log('Uncaught Exception: ', err);
});

process.on('exit', function() {
    if ( db ) {
        try {
            db.close();
        }
        catch (e) {}
    }
    console.log('Clean getaway ;-)');
});

module.exports = app;
