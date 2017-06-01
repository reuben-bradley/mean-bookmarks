/* 
 * Entry point to the frontend javascript application.
 * 
 * @author Reuben Bradley <reuben.m.bradley@gmail.com>
 */

var corejs = require('core-js/client/shim.min');
var zonejs = require('zone.js/dist/zone');
var platformBrowserDynamic = require('@angular/platform-browser-dynamic');
var appModule = require('./app.module');

(function ( app ) {
    console.log('Bienvenue world!');
    
    document.addEventListener('DOMContentLoaded', function () {
        platformBrowserDynamic.platformBrowserDynamic()
            .bootstrapModule(appModule);
    });
})(window.app || (window.app = {}));
