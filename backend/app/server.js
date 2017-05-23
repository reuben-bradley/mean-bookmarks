/**
 * Main entry point to the application
 * 
 * @author Reuben Bradley <reuben.m.bradley@gmail.com>
 */

var PORT = 8090;
var app = require('./app');

app.listen(PORT);
console.log('Running application on http://localhost:' + PORT);
