/* 
 * Main application module
 * 
 * @author Reuben Bradley <reuben.m.bradley@gmail.com>
 */

var NgModule = require('@angular/core').NgModule;
var platformBrowser = require('@angular/platform-browser');

var appRouting = require('./modules/app-routes.module');

var appComponent = require('./app.component');
var navComponent = require('./components/app.nav--main');
var landingComponent = require('./components/landing');
var signinComponent = require('./components/signin');
var signupComponent = require('./components/signup');

var AppModule = NgModule({
        imports: [
            platformBrowser.BrowserModule,
            appRouting
        ],
        declarations: [
            appComponent,
            navComponent,
            landingComponent,
            signinComponent,
            signupComponent
        ],
        bootstrap: [appComponent, navComponent]
    })
    .Class({
        constructor: function () {}
    });

module.exports = AppModule;
