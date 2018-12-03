// server.js
"use strict";
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt'); 
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
        var psw = req.body.psw;
        //ensures password is not empty
        if(psw == ""){
            return res.send({message: "Enter password"});
        }
        var salt = bcrypt.genSaltSync(saltRounds);  
        var hash = bcrypt.hashSync(psw, salt); 
        var code = randomstring.generate(); 
        randomNum= Math.floor((Math.random() * 100) + 54);
        host = req.get('host');
        link="http://"+req.get('host')+"/verify?id="+randomNum;
        
        
        //creates new account instance
        var newUser = new User({
            email : email, password: hash, Isverified: false, code: code, loggedIn : false 
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
            html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" + newUser.code
    }
        smtpTransport.sendMail(mailOptions, function(error, response){
             if(error){
                console.log(error);
                res.end("error");
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
    
/*
router.route('/verify') 

    .post((req, res) => {
        console.log(req.protocol+":/"+req.get('host'));
        //getting code from body
        //const {code} = req.body; 

        //find the account which matches the varification code
       if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.send({message : 'verification success'});
        res.end("<h1>Email "+mailOptions.email+" is been Successfully verified");
        Isverified : true;
    }
    else
    {
        console.log("email is not verified");
        res.send("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
    }); 
    */
    app.get('/verify?id=' +randomNum,function(req,res){
        
    if((req.protocol+"://"+req.get('host'))==("https://"+host))
    {
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.randomNum==randomNum)
    {
        //else sets user to logged in
        const {code} = req.body;
        console.log({code});
         host = req.get('host');
        User.find({code : code},(err, acc)=>{
            if(err){
                return res.send(err); 
            }
            
            //Checks if the account matching the code exists
            if(acc[0] == null){
                return res.send({message:'No user found'}); 
            }
            
            //else sets user to logged in
            acc[0]['Isverified'] == true; 
            
            //sets verification code to empty string
            acc[0]['loggedIn'] == true; 
            
            //saves account
            acc[0].save((err)=> {
                if(err){
                    return res.send(err); 
                }
                
                return res.send({message: 'verification success'}); 
            });
        }); 
       
            res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
    }
    
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
});

    router.route('/login')

    .post(function(req, res){
        
        //getting email and password form service
        var email = req.body.email, psw = req.body.psw;
        
        //checks if password is empty
        if(psw == ""){
            return res.json({message: 'Password is invalid'}); 
        }
        
        //special case for admin login
        if(email == "admin" && psw == "admin") {
            res.send({message:'admin'});
        }
        else {//if admin credentials have not been entered
            User.find({email:email}, function(err, account){
                
                //checking the username 
                if(account[0] == null){
                    return res.json({message: 'Username is invalid'}); 
                }
                
                //validating the password with bcrypt
                var valid = bcrypt.compareSync(psw, account[0]['password']);
                if(!valid){
                    return res.json({message: 'Password is invalid'}); 
                }
                
                //Confirming the account has been verified 
                if(!(account[0]['loggedIn'])){
                    return res.json({message: 'You must verify your account'}); 
                }
                
                if(err){
                    return res.send(err); 
                }
                
                res.send({message:'success', email: account[0]['email']}); 
                
            });
        }
    });
router.route('/reviews/:itemname')
    .get(function(req,res){
       Review.find({itemName:req.params.itemname},function(err, reviews){
           if(err){
               res.send(err); 
           }
          res.json(reviews); 
        });
    });
    
router.route('/reviews')
.get(function(req, res) {
        Review.find(function(err, reviews) {
            //Item.name = req.body.name;
            if (err){
                 res.send(err);
            }
            res.json(reviews);
        });

    })
    .post(function(req, res) {
        var review = new Review();
         review.rating = req.body.rating; 
            review.comment = req.body.comment;
            review.user = req.body.user;
            review.itemName = req.body.itemName;
            
        
        review.save(function(err) {
            if (err){
               res.send(err);
            }
            res.json({ message: 'Review Created!' });
        });
    });
    



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port); 
console.log('Magic happens on port ' + port);