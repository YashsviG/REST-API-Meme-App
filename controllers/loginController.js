let userModel = require('../models/userModel');
let jwt = require('jsonwebtoken');
const strings = require('./string');

authUser = (req,res) => {
    let body = req.body;

    console.log("body",body.password);
    console.log(body.username);
    
    let users = userModel.findUser(body.username,body.password);
    
    users.then(([data,meta]) => {
        if(data.length==1) {
            res.status(200).json({token:
                jwt.sign({
                    username:data[0].username,
                    password:data[0].password,
                    id:data[0].id
                },'MYSECRETKEY'),
                id: data[0].id,
                //window.location.href = "../views/Profile.html";
            });
            
        } else {
            res.status(401).json({message: strings.names["A"]})
        }
    })
}



module.exports = {
    authUser: authUser
}