/* 
 * Application routing
 * 
 * @author Reuben Bradley <reuben.m.bradley@gmail.com>
 */

var NgModule = require('@angular/core').NgModule;
var router = require('@angular/router');

var landingComponent = require('../components/landing');
var signinComponent = require('../components/signin');
var signupComponent = require('../components/signup');

var routes = [
    { path: '', component: landingComponent },
    { path: 'login', component: signinComponent },
    { path: 'signup', component: signupComponent }
];

var AppRouteModule = NgModule({
        imports: [router.RouterModule.forRoot(routes)],
        exports: [router.RouterModule]
    })
    .Class({
        constructor: function () {}
    });

module.exports = AppRouteModule;
