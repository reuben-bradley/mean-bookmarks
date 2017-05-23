/* 
 * Configuration file for the application
 */

var SECRETS = require('./secrets');

var config = {
    env: 'production',
    db: {
        dev: {
            host: 'db',
            port: '27017',
            database: 'bookmarker_app',
            user: 'bookmarker',
            password: SECRETS.db_password
        },
        production: {
            host: 'db',
            port: '27017',
            database: 'bookmarker_app',
            user: 'bookmarker',
            password: SECRETS.db_password
        }
    }
};

if ( process.argv.length > 2 ) {
    // Parse passed arguments
    var arg, key, value;
    for ( var x = 2, ln = process.argv.length; x < ln; x++ ) {
        arg = process.argv[x].split('=');
        key = arg[0].replace(/-/g, '');
        value = arg[1];
        config[key] = value;
    }
}

module.exports = config;
