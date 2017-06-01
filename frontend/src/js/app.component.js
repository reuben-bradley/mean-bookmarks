/* 
 * Main application component
 * 
 * @author Reuben Bradley <reuben.m.bradley@gmail.com>
 */

var NgComponent = require('@angular/core').Component;

var AppComponent = NgComponent({
        selector: '.my-app',
        template: '<router-outlet></router-outlet>'
    })
    .Class({
        constructor: function () {}
    });

module.exports = AppComponent;
