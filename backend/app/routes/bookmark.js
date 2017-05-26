/* 
 * Routes dealing with bookmark actions (list, edit, delete, etc.)
 * 
 * @author Reuben Bradley <reuben.m.bradley@gmail.com>
 */

var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();

router.get('/', function( req, res ) {
    // Retrieve the bookmark collection
    var bmCollection = req.db.collection('bookmarkCollection');
    // Pull the list of bookmarks from the database
    bmCollection.find().toArray(function ( err, docs ) {
        res.render('list', {
            bookmarks: docs
        });
    });
});

router.put('/add', function( req, res ) {
    // Retrieve the bookmark collection
    var bmCollection = req.db.collection('bookmarkCollection');
    // Validate the information provided
    var data = req.body;
    for ( var k in data ) {
        if ( data[k].trim ) {
            data[k] = data[k].trim();
        }
    }
    if ( !data.title ) {
        console.log('No title given, cannot save bookmark.');
    }
    if ( !data.url ) {
        console.log('No URL given, cannot save bookmark.');
    }
    if ( data.tags ) {
        // Reformat tags as an array
        data.tags = data.tags.split(',').map(function (tag) {
            return tag.trim();
        });
    }
    // Add the new bookmark to the collection
    bmCollection.save(data, function( err, result ) {
        if ( err ) {
            return console.log(err);
        }
        console.log('Bookmark successfully saved.');

        // Redirect to the home page
        res.redirect('/');
    });
});

router.delete('/delete/:id', function( req, res ) {
    // Retrieve the bookmark collection
    var bmCollection = req.db.collection('bookmarkCollection');
    // Delete the bookmark with the given id
    bmCollection.deleteOne({ _id: ObjectID(req.params.id) }, function( err, result ) {
        if ( err ) {
            return console.log(err);
        }
        if ( result.result.n ) {
            console.log('Bookmark successfully deleted.');
        }

        // Redirect to the home page
        res.redirect('/');
    });
});

router.patch('/bookmark/edit/:id', function( req, res ) {
    // Retrieve the bookmark collection
    var bmCollection = req.db.collection('bookmarkCollection');
    // Validate the information provided
    var data = req.body;
    for ( var k in data ) {
        if ( data[k].trim ) {
            data[k] = data[k].trim();
        }
    }
    if ( !data.title ) {
        console.log('No title given, cannot save bookmark.');
    }
    if ( !data.url ) {
        console.log('No URL given, cannot save bookmark.');
    }
    if ( data.tags ) {
        // Reformat tags as an array
        data.tags = data.tags.split(',').map(function (tag) {
            return tag.trim();
        });
    }
    // Update the bookmark in the collection
    bmCollection.updateOne({ _id: ObjectID(req.params.id) }, { $set: data }, function( err, result ) {
        if ( err ) {
            return console.log(err);
        }
        if ( result.result.n ) {
            console.log('Bookmark successfully updated.');
        }

        // Redirect to the home page
        res.redirect('/');
    });
});

module.exports = router;
