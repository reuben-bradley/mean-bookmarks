/* 
 * Application routes
 * 
 * @author Reuben Bradley <reuben.m.bradley@gmail.com>
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    // Pull the list of bookmarks from the database
    var bmCollection = req.db.collection('bookmarkCollection');
    bmCollection.find().toArray(function ( err, docs ) {
        res.render('home', {
            user: 'visitor',
            bookmarks: docs
        });
    });
});

module.exports = router;
