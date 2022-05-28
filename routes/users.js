const express = require('express');
const router = express.Router();
const cryptojs = require('crypto-js');
const nanoid = require('nanoid');
const cors = require('cors');

router.use(cors());

const UserModel = require('../models/UserModel');

require('dotenv').config();




router.post('/add', async function(req, res, next) {
    
    try {

        let user = {
            id: nanoid.nanoid(),
            email: req.body.email,
            password: cryptojs.SHA256(req.body.password, process.env.SALT).toString(),
            subscription: req.body.subscription
        }

        const signup = new UserModel(user);
        await signup.save();

        res.status(201).json(user);
    } 

    catch (err) {
        console.error(err);
    }
    
});


router.post('/login', async function(req, res){

    try{

        let userFromDB = await UserModel.findOne({email: req.body.email}) || '';

        if(req.body.email != null && req.body.password != null){

            if(userFromDB.email === req.body.email && userFromDB.password === cryptojs.SHA256(req.body.password, process.env.SALT).toString()){
                console.log('Logged in.');

                res.send(userFromDB.id);
            }
    
            else{
                console.log('Wrong email or password.');

                res.send('loginFailed')
            }
        }
   
    }

    catch(err){
        console.error(err);
    }

});


router.post('/loggedIn', async function(req, res){

    if(req.body.id != null){

        try {
            let userFromDB = await UserModel.findOne({id: req.body.id}) || '';
            console.log(req.body);

            res.json({
                email: userFromDB.email,
                subscription: userFromDB.subscription
            });
        } 
        
        catch (err) {
            console.error(err);
        }

    }

});


router.put('/subscription', function(req, res){

    try {
        UserModel.findOneAndUpdate({email: req.body.email}, {subscription: req.body.subscription}, () => {}); //only executes if callback is provided
    } 

    catch (err) {
        console.error(err);
    }

});


module.exports = router;
