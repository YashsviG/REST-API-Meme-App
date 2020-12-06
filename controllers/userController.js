let userModel = require('../models/userModel');
const strings = require('./string');

createUser = (req,res) => {
    if(!req.body.username) return res.status(400).json({message:strings.names["Z"]});
    if(!req.body.password) return res.status(400).json({message:strings.names["0"]});
    if(!req.body.email) return res.status(400).json({message:strings.names["1"]});
    console.log("cred",req.body.username,req.body.email, req.body.password)
    userModel.userNameTaken(req.body.username,req.body.password,req.body.email)
        .then(([data, meta])=>{
            if(data.length != 0){
                return res.status(409).json({message:strings.names["O"]});
            } else {
                let user = userModel.newUser(req.body.username, req.body.email, req.body.password);
                user.then(([data, meta])=>{
                    let resource = {
                        id: data.insertId,
                        uri: `/api/v1/user/${data.insertId}`,
                        username: req.body.username, 
                        email: req.body.email,
                    }
                    res.status(201).json(resource);

                });
            }
        });
}

getUser = (req,res) => {
    if(req.user.id != req.params.id){
        return res.status(401).json({message:strings.names["G"]});
    }
    
    let user = userModel.getUserById(req.params.id);
    user.then(([data, meta])=>{
        data[0].uri = `/api/v1/user/${req.params.id}`
        res.status(200).json(data[0]);
    });
}

updateUser = (req,res) => {
    if(!req.body.email && !req.body.name && !req.body.email) return res.status(400).json({message:strings.names["J"]});
    if(req.user.id != req.params.id){
        return res.status(401).json({message:strings.names["G"]});
    }
    let user = userModel.updateUser(req.user.id, req.body);
    user.then(([data, meta])=>{
        res.status(200).json({message: strings.names["X"]});
    });
}

deleteUser = (req,res) => {
    if(req.user.id != req.params.id){
        return res.status(401).json({message:strings.names["G"]});
    }
    let user = userModel.deleteUser(req.params.id);
    user.then(([data, meta])=>{
        res.status(200).json({message: strings.names["Y"]});
    });
}


module.exports = {
    createUser: createUser,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
}