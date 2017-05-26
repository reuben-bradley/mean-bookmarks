/*
 * Routes dealing with user functions (sign up, login, logout, etc.)
 * 
 * @author Reuben Bradley <reuben.m.bradley@gmail.com>
 */

var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

router.put('/signup', function( req, res ) {
    var errors = [];
    var data = req.body;
    if ( !data.username ) {
        errors.push('Username is a required field.');
    }
    if ( !data.password ) {
        errors.push('Password is a required field.');
    }

    if ( errors.length ) {
        return res.json({ success: false, errors: errors });
    }

    var userCol = req.app.getDB().collection('userCollection');
    // Hash the password for storage, then create the user
    bcrypt.genSalt(10, function( err, salt ) {
        if ( err ) {
            console.log('Error generating password salt: ' + err);
            return res.json({ success: false, errors: ['An error occurred while saving the user.'] });
        }
        bcrypt.hash(data.password, salt, function( err, hash ) {
            if ( err ) {
                console.log('Error hashing password: ' + err);
                return res.json({ success: false, errors: ['An error occurred while saving the user.'] });
            }
            data.password = hash;
            userCol.save(data, function( err, result ) {
                if ( err ) {
                    console.log('Error creating user: ' + err);
                    return res.json({ success: false, errors: ['A user with that username already exists.'] });
                }
                return res.json({ success: true, msg: 'User successfully created.' });
            });
        });
    });
});

module.exports = router;
