// server.js
"use strict";
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://yallahha-se3316-yallahha-lab5-6575307:27017/items',  {useNewUrlParser: true }); 

var Item    = require('./models/item');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();              // get an instance of the express Router
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
//ROUTE FOR /items
router.route('/items')


    //POST
    .post(function(req, res) {
        var item = new Item();
         item.name = req.body.name; 
            item.price = req.body.price;
            item.tax = req.body.tax;
            item.quantity = req.body.quantity;
        
        item.save(function(err) {
            if (err){
               res.send(err);
            }
            res.json({ message: 'Item created!' });
        });
    })
    //get FOR ALL
    .get(function(req, res) {
        Item.find(function(err, items) {
            //Item.name = req.body.name;
            if (err){
                 res.send(err);
            }
            res.json(items);
        });

    });
    router.route('/items/:item_id')

    //GET for ONE 
    .get(function(req, res) {
        Item.findById(req.params.item_id, function(err, item) {
            if (err){
                res.send(err);
            }
            res.json(item);
        });
    })
    //UPDATE
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Item.findById(req.params.item_id, function(err, item) {

            if (err){
                 res.send(err);
            }
            //item.name = req.body.name;  // update the bears info
            //item.price = req.body.price;
            item.tax = req.body.tax;
            item.quantity = req.body.quantity;

            // save the bear
            item.save(function(err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'item updated!' });
            });

        });
    })
    //DELETE
    .delete(function(req, res) {
        Item.remove({
            _id: req.params.item_id
        }, function(err, item) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted' });
        });
    });
    

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port); 
console.log('Magic happens on port ' + port);