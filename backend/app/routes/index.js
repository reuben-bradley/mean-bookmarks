/* 
 * Application routes
 * 
 * @author Reuben Bradley <reuben.m.bradley@gmail.com>
 */

var express = require('express');
var router = express.Router();

var userRoutes = require('./user');
var bookmarkRoutes = require('./bookmark');

router.use('/user', userRoutes);
router.use('/bookmark', bookmarkRoutes);

router.use('/', function( req, res ) {
    res.render('home');
});

module.exports = router;
