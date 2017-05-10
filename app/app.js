/* 
 * Main application logic.
 * 
 * @author Reuben Bradley <reuben.m.bradley@gmail.com>
 */

var express = require('express');

var app = express();
app.get('/', function (req, res) {
    res.send('Hello world, from Node, Express, and Docker!');
});

module.exports = app;
