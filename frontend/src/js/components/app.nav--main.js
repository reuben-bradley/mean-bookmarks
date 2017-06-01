/* 
 * Main navigation component
 * 
 * @author Reuben Bradley <reuben.m.bradley@gmail.com>
 */

var NgComponent = require('@angular/core').Component;

var NavComponent = NgComponent({
        selector: '.nav--main',
        templateUrl: '/build/html/nav--main.html'
    })
    .Class({
        constructor: function () {
            this.user = false;
        }
    });

module.exports = NavComponent;
