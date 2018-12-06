// server.js
"use strict";
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs'); 
var nodemailer = require('nodemailer');
var mongoose   = require('mongoose');
var randomstring = require('randomstring');
var nev = require('email-verification')(mongoose);
const saltRounds = 10; 
mongoose.connect('mongodb://yallahha-se3316-yallahha-lab5-6575307:27017/items',  {useNewUrlParser: true }); 

var Item    = require('./models/item');
var User = require('./models/user');
var validator = require('validator'); 

var Collection = require('./models/CartCollection');
//var User = require('./models/userModel');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var smtpTransport = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
        user: "testinpython12@gmail.com",   
        pass: 'passtheball123'
    }
});

var randomNum,mailOptions,host,link, loggedUser;


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
            item.description = req.body.description;
            item.sales = req.body.sales;
            item.comments= req.body.comments;
            item.ratings=req.body.ratings;
            item.shoppingCart = req.body.shoppingCart;
            item.cartPrice = req.body.cartPrice;
        
        item.save(function(err) {
            if (err){
               res.send(err);
            }
            res.json({ message: 'Item created!' });
        });
    })
    //get FOR ALL
    .get(function(req, res) {
        Item.find({quantity: {$gte: 1}}).exec(function(err, items) {
            //Item.name = req.body.name;
            if (err){
                 res.send(err);
            }
            res.json(items);
        });

    });
    router.route('/sortedItems')
    .get(function(req, res) {
        Item.find().sort({sales: 'descending'}).limit(10).exec(function(err, itemsFound) {
             if (err){
                 res.send(err);
            }
            res.json(itemsFound);
        })
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
            item.name = req.body.name; 
            item.price = req.body.price;
            item.tax = req.body.tax;
            item.quantity = req.body.quantity;
            item.description = req.body.description;
            item.sales = req.body.sales;
            

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
    
    
router.route('/signup')
    .post(function(req,res){
        console.log(req);
        //getting password fromm service
        var email = req.body.email;
        console.log(email);
        //checks if the email is valid
        if(!validator.isEmail(email) || email == ""){
            return res.send({message: "Incorrect email"});
        }
    //getting 
        var password = req.body.password;
        //ensures password is not empty
        if(password== ""){
            return res.send({message: "Enter password"});
        }
        var salt = bcrypt.genSaltSync(saltRounds);  
        var hash = bcrypt.hashSync(password, salt); 
    var code = randomstring.generate(); 
  //  randomNum= Math.floor((Math.random() * 100) + 54);
        host = req.get('host');
       link="https://"+req.get('host')+"/api/verify/"+code;
       var verificationCode = code;
        
        
        //creates new account instance
        var newUser = new User({
            email : email,
            password: hash, 
            isAdmin: false,
            isVerified: false,
            isActive: false,
            verificationCode: verificationCode
        });
        User.find({'email':email}, function(err, accFound){
            if(accFound[0] == null){
                //if the email isnt in use go forward with crerating account
                newUser.save(function(err){
                    if(err){
                        res.send(err); 
                    }
                });
           
                res.send({message: 'User created'});
            }
            else{
                res.send({message: 'Already Taken'});
            }
        });
         mailOptions={
            to : req.body.email,
            subject : "Please confirm your Email account",
            html : "Hello,<br> Please Click on the link to verify your email. " + link
    }
        smtpTransport.sendMail(mailOptions, function(error, response){
             if(error){
                console.log(error);
                res.send("error");
             }else{
                res.end("email sent");
             }
        });
})
.get(function(req,res){
       User.find(function(err, accounts){
           if(err){
           return    res.send(err); 
           }
           console.log(accounts);
          return res.json(accounts); 
        });
    });
    

    ///VERIFIY EMAIL
    router.route('/verify/:id')
    .get(function(req,res){
        User.findOne({verificationCode: req.params.id}, function (err, accFound){
             if(accFound != null){
            accFound.isVerified = true;
            //console.log(acc);
            accFound.save(function(err, accFound){
            if(err){
               // return res.send(err); 
            }
            res.end("<h2>You have verified your account!!</h2>");
            });
            }
    });
            
});

       
            //res.send("Email "+mailOptions.to+" is been Successfully verified");

    router.route('/login')

    .post(function(req, res){
        
        //getting email and password form service
        var email = req.body.email, password = req.body.password;
        console.log(password);
        
        
        //checks if password is empty
        if(password == ""){
            return res.json({message: 'Password is invalid'}); 
        }
        
        //if admin credentials have not been entered
            User.findOne({email:email}, function(err, accountFound){
                if(err){
                   
                }
                console.log(accountFound);
                
                //checking the username 
                if(accountFound){
                var check = bcrypt.compareSync(password, accountFound.password);
                    if(check == false){
                       return res.json({message: 'Wrong password'}); 
                    }
            
               //Confirming the account has been verified 
                if(!(accountFound.isVerified)){
                    return res.json({message: 'You must verify your account'}); 
                }
                if(accountFound.isAdmin == true){
                    return res.json({message: "Welcome Admin"});
                }
                
                //console.log(acc);
                accountFound.save(function(err, accountFound){
                if(err){
               // return res.send(err); 
                }
                
                
            });
                
            res.send({message:'success', email: accountFound.email, verificationCode: accountFound.verificationCode});
                }
                else {
                    return res.json({message: "Invalid Username"});
                }
    });
    
    
});


//GETTING A REVIEW FOR AN ITEM
router.route('/reviews/:name')
    .get(function(req,res){
       Item.find({name:req.params.name},function(err, reviews){
           if(err){
               res.send(err); 
           }
          res.json(reviews); 
        });
    })
    .post(function(req, res) {
        var user = req.body.email;
        Item.findOne({name:req.params.name}, function(err, itemFound) {
            
        if(itemFound.comments[4] == null){
            if(req.body.comment == null){
                 return res.json({message: 'You must enter a comment and a rating'}); 
            }
           
          itemFound.comments.push(user + ": " + req.body.comment); 
            itemFound.ratings.push(req.body.rating);  
        
        
        itemFound.save(function(err) {
            if (err){
               res.send(err);
            }
            res.json({ message: 'Item created!' });
        });
        }
        else{
            return res.json({message: 'Limit of comments was reached'}); 
        }
        });
    })
    .delete((req, res) => {
        
        //finding collection by id and deleting
        User.removeOne({name: req.params.name}, (err, itemFound)=> {
            if (err) {
                return res.send(err);
            }
            itemFound.comments.pop();
            itemFound.ratings.pop();
            return res.send({message : "success"}); 
        })
    });
    router.route('/Admin')
    .post(function(req, res) {
        var item = new Item();
         item.name = req.body.name; 
            item.price = req.body.price;
            item.tax = req.body.tax;
            item.quantity = req.body.quantity;
            item.description = req.body.description;
            item.sales = req.body.sales;
            item.comments= req.body.comments;
            item.ratings=req.body.ratings;
            item.shoppingCart = req.body.shoppingCart;
            item.cartPrice = req.body.cartPrice;
        
        item.save(function(err) {
            if (err){
           return    res.send(err);
            }
          return  res.json({ message: 'Item created!' });
        });
    })
    .get(function(req, res) {
        Item.find(function(err, items) {
            //Item.name = req.body.name;
            if (err){
                 res.send(err);
            }
            res.json(items);
        });

    });
    
router.route('/Buy')
    .put(function(req, res) {
        var itemsChosen = req.body.list;
        var length = req.body.index;
        for(let i = 0; i< length; i++){
        
        Item.findOne({name: itemsChosen[i].name}, function(err, UserFound) {
            if(err){
                res.send(err);
            }
        UserFound.quantity = UserFound.quantity - itemsChosen[i].quantity;
        UserFound.sales = UserFound.quantity + itemsChosen[i].quantity;
        UserFound.save(function(err) {
            if (err){
               res.send(err);
            }
            });
            });
        }
        res.json({ message: 'Item Added!' });
    });
    
//CREATING A COLLECTION
router.route('/newCollection/:name')

    .post(function(req, res){
        
        //getting user, name and password form service
       var user = req.params.name, name = req.body.name, description = req.body.desc, visible= req.body.isprivate;   
        
        //Checking if there is already a collection with the same name and user
        console.log(user);
        console.log(name);
         Collection.find({collUser: user, collName : name}, function(err, collections){
            if(collections[0] != null){
                 return res.json({message: "You already have a collection with the same name"});
            }
            if(err){
                return res.send(err);
            }
            var coll= new Collection();
            coll.collUser= user;
            coll.collName= name;
            coll.desc = description;
            coll.isprivate= true;
          
                
            coll.save(function(err){
                if(err){
                    return res.send(err);
                }
                
            });
            return res.send({message: 'Collection is created'});
        });
        
    });
    
    //ROUTE TO GET ALL COLLECTIONS AND POST 
    router.route('/getAllCollections/:name') 
    .get(function(req,res){
        var user = req.params.name;
        console.log(user);
       Collection.find({collUser: user}, function(err, collections){
           if(err){
               res.send(err); 
           }
          res.json(collections); 
         
        });
    });
    //ADD an item to the collection
router.route('/getEveryCollection')
    
    .post((req, res)=> {
        //gets all collections
        Collection.find(function(err, col){
            if(err){
                return res.send(err);
            }
            console.log(col);
            return res.send(col); 
            
        }); 
        
    });
    
    






// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port); 
console.log('Magic happens on port ' + port);