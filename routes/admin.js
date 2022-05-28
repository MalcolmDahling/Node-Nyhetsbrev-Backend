const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

const UserModel = require('../models/UserModel');

let loginForm = `
    <form method="post">
        <h2>Login to admin</h2>

        <input type="text" name="username" placeholder="Username">
        <input type="password" name="password" placeholder="Password">
        <input type="submit" value="Login">
    </form>
`;


router.get('/', function(req, res, next) {
    res.send(loginForm);
});


router.post('/', async function(req,res){
    
    if(req.body.username == 'admin' && req.body.password == 'admin'){

        let usersFromDB = await UserModel.find();

        let subbedUsers = [];
        let nonSubbedUsers = [];

        for(let i = 0; i < usersFromDB.length; i++){

            if(usersFromDB[i].subscription == 'true'){
                subbedUsers.push(' ' + usersFromDB[i].email);
            }

            else{
                nonSubbedUsers.push(' ' + usersFromDB[i].email);
            }
        }

        res.send(`
            <form action="admin/logout" method="get">
                <input type="submit" value="Logout">
            </form>

            <h2>Subscribed Users:</h2>
            ${subbedUsers}

            <h2>Non Subscribed Users:</h2>
            ${nonSubbedUsers}
        `);
    }

    else{
        res.send(`${loginForm}<p>Wrong username or password.</p>`)
    }
});

router.get('/logout', function(req, res){
    res.send('<h1>Close the tab to finish the logout process.</h1>');
});


module.exports = router;
