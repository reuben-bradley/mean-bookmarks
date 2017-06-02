/* 
 * Signup form component
 * 
 * @author Reuben Bradley <reuben.m.bradley@gmail.com>
 */

var Component = require('@angular/core').Component;

var SignupComponent = Component({
        selector: 'signup-form',
        templateUrl: '/build/html/signup.html'
    })
    .Class({
        constructor: function () {
            this.model = {
                username: '',
                email: '',
                password: '',
                confirm: ''
            };
        },
        onSubmit: function () {
            console.log('Form submitted', arguments);
            console.log('Current model', this.model);
        }
    });

module.exports = SignupComponent;
