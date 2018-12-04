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
var Review = require('./models/review');
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

var randomNum,mailOptions,host,link;


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
            loggedIn : false, 
            isAdmin: false,
            isVerified: false,
            verificationCode: verificationCode
        });
        User.find({'email':email}, function(err, account){
            if(account[0] == null){
                
            
                //if the email isnt in use go forward with crerating account
                newUser.save(function(err){
                    if(err){
                        res.send(err); 
                    }
                    res.json({message: 'User created'}); 
                });
            }else{
                res.send({message: 'Email already in use'});
            }
            if(err){
                res.send(err); 
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
               res.send(err); 
           }
          res.json(accounts); 
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
        
        //checks if password is empty
        if(password == ""){
            return res.json({message: 'Password is invalid'}); 
        }
        //if admin credentials have not been entered
            User.findOne({email:email}, function(err, accountFound){
                
                //checking the username 
                if(accountFound == null){
                    return res.json({message: 'Username is invalid'}); 
                }
                
               //Confirming the account has been verified 
                if(!(accountFound.isVerified)){
                    return res.json({message: 'You must verify your account'}); 
                }
                if(accountFound != null){
                accountFound.loggedIn = true;
                //console.log(acc);
                accountFound.save(function(err, accountFound){
                if(err){
               // return res.send(err); 
                }
             res.send({message:'success', email: accountFound.email});
            });
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
          itemFound.comments.push(req.body.comment + JSON.stringify(user));
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
    });
//CREATING A COLLECTION
router.route('/newCollection')

    .post(function(req, res){
        
        //getting user, name and password form service
        var cartUser = req.body.cartUser, cartName = req.body.cartName, desc = req.body.desc;    
        
        //Checking if there is already a collection with the same name and user
        Collection.find({ cartUser : cartUser, cartName : cartName}, function(err, collections){
            
            if(err){
                return res.send(err);
            }
            //Check if Collection is already created with that same name
            if(!(collections[0]==null)){
                return res.json({message: "You already have a duplicate name collection"}); 
            }
            
            //else creates a new collection with req body values
            var collect= new Collection();
            collect.cartUser= cartUser;
            collect.cartName= cartName;
            collect.desc = desc;
            collect.isprivate= true;
            
            collect.save(function(err){
                if(err)
                    return res.send(err);
                
                res.json({message: 'success'});
            });
            
        });
    });
    
    //ROUTE TO GET ALL COLLECTIONS AND POST 
router.route('/getAllCollections')
    //Post 
    .post((req, res)=> {
        //getting user from service
        var cartUser = req.body.cartUser;
        //finding all collections from that user
        Collection.find({cartUser : cartUser}, (err, col)=>{
            if(err){
                return res.send(err);
            }
            return res.send(col); 
            
        }); 
        
    })
    //Get All
    .get(function(req,res){
       Collection.find(function(err, collections){
           if(err){
               res.send(err); 
           }
          res.json(collections); 
        });
    });
    //ADD an item to the collection
router.route('/addtoCollection')

    .post((req, res)=>{
        //getting user, image and collection name from service
        var cartUser = req.body.cartUser,cartName = req.body.cartName; 
        
        //checks if collection exists
        Collection.find({cartUser : cartUser, cartName : cartName}, (err, collections)=>{
            
            if(err){
                return res.send(err); 
            }
            
            if(collections[0] == null){
                return res.send({message : "no collection"}); 
            }
            
            //else push image 
            collections[0].save((err)=>{
                if(err){
                    return res.send(err);
                }
                return res.send({message : "success"}); 
            }); 
            
        }); 
        
    });
    
router.route('/deleteItemCollection')

    .post((req, res)=> {
        //getting user, image, name of the collaction from service
        var cartUser = req.body.cartUser,  cartName = req.body.cartName;

        //finding collection from user
        Collection.find({cartUser : cartUser, cartName : cartName}, (err, col)=>{
            console.log(col[0]);
            if(err){
                return res.send(err); 
            }
            
            
            //checking if collection exists
            if(col[0] == null){
                return res.send({message : "no collection"}); 
            }
            
            col[0].save((err)=>{
                if(err){
                    return res.send(err); 
                }
                return res.send({message : "success"}); 
            }); 
            
        }); 
    })

router.route('/deleteCollection:id')

    .delete((req, res) => {
        
        //finding collection by id and deleting
        Collection.remove({_id: req.params.id}, (err, col)=> {
            if (err) {
                return res.send(err);
            }
            return res.send({message : "success"}); 
        })
    })

router.route('/saveCollection')

    .put((req, res)=> {
        //getting user the old name of the collection, the new name of the collection and the description of the collection
        var cartUser = req.body.user, oldname = req.body.oldname, cartName = req.body.cartName, desc = req.body.desc;
        
        console.log('server oldname & user', oldname, cartUser);
        Collection.find({cartUser : cartUser, cartName : oldname}, (err, col)=>{
            if(err){
                return res.send(err); 
            }
            
            //saving new name and description for collection
            col[0]['desc'] = desc;
            col[0]['cartName'] = cartName;
            col[0].save((err)=>{
                if(err){
                    return res.send(err); 
                }
                return res.send({message : "success"}); 
            }); 
        });
    });
    //DMCA PRIVACY
router.route('/updatePrivacy')
    
    .put((req, res)=>{
        //getting privacy setting
        var type = req.body.type, user = req.body.user, name = req.body.name; 
        console.log(req.body);
        Collection.find({name : name, user : user }, (err, col) =>{
            if(err){
                return res.send(err); 
            }
            
            //set new privacy setting
            col[0].ispublic = type; 
            
            col[0].save((err)=>{
                if(err){
                    res.send(err); 
                }
                
                res.send({message : "success"}); 
            });
            
        });
    });

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
        
    })





// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port); 
console.log('Magic happens on port ' + port);