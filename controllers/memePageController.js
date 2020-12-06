let memePageModel = require('../models/memePageModel');
let memeModel = require('../models/memeModel');
const strings = require('./string');

newMemePage = (req,res) =>{
    
    if(!req.body.title) return res.status(400).json({message:strings.names["P"]});
    if(!req.body.description) return res.status(400).json({message:strings.names["Q"]});
    console.log("IN HERE");
    let memePage = memePageModel.createMemePage(req.body.title, req.user.id, req.body.description)
    memePage.then( ([data,meta]) => {
        let memes = [];
        for(let meme in req.body.memes){
            memes.push(memeModel.newMeme(data.insertId, req.body.memes[meme].content, req.body.memes[meme].image))
        }
        let q = {
            uri: `/api/v1/memePage/${data.insertId}`,
            id: data.insertId,
            title: req.body.title, 
            author_id: req.user.id, 
            description: req.body.description, 
           
        }
        Promise.all(memes)
            .then((values)=>{
                q.memes = values.map((meme)=>{
                    return `/api/v1/memePage/${q.id}/meme/${meme[0].insertId}`;
                });
                res.status(201).json(q);
            })
    });
}

getMemePage = (req,res) => {
    if(!req.params.id) return res.status(400).json({message:strings.names["H"]});
    let memePage = memePageModel.getMemePageById(req.params.id);
    memePage.then(([data, meta])=>{
        if(data[0].author_id != req.user.id){
            return res.status(401).json({message:strings.names["G"]});
        } else { 
            data[0].uri = `/api/v1/memePage/${data[0].id}`;
            res.status(200).json(data[0]);
        }
    });
}


searchMemePage = (req,res)=>{
    if(!req.params.id) return res.status(400).json({message:strings.names["H"]});
    let memePages = memePageModel.findMemePage(req.query.search);
    memePages.then(([data, meta]) => {
        res.status(200).json(data);
    })
}

getUserMemePage = (req,res) => {
    if(req.user.id != req.params.id){
        return res.status(401).json({message:strings.names["G"]});
    }
    let memePages = memePageModel.getUserMemePage(req.params.id);
    memePages.then(([data, meta])=>{
        res.status(200).json(data);
    })
}

updateMemePage = (req,res) =>{
    console.log("IN HERE");
    if(!req.params.id) return res.status(400).json({message:strings.names["H"]});
    if(!req.body.title && !req.body.description) return res.status(400).json({message:strings.names["J"]});
    let memePage = memePageModel.getMemePageById(req.params.id);
    memePage.then(([data, meta]) => {
        if(!data[0]){
            res.status(404).json({message: strings.names["F"]});
        } else if(data[0].author_id != req.user.id){
            return res.status(401).json({message:strings.names["G"]});
        } else {
            memePageModel.updateMemePage(req.params.id, req.body)
                .then(([data, meta]) => {
                    res.status(200).json({message: strings.names["U"]});
                });
        }
    });
}



deleteMemePage = (req,res) => {
    if(!req.params.id) return res.status(400).json({message:strings.names["H"]});
    let memePage = memePageModel.getMemePageById(req.params.id);
    memePage.then(([data, meta]) => {
        if(!data[0]){
            res.status(404).json({message: strings.names["F"]});
        } else if(data[0].author_id != req.user.id){
            return res.status(401).json({message:strings.names["G"]});
        } else {
            Promise.all([memeModel.deleteAllMemes(req.params.id), memePageModel.deleteMemePage(req.params.id)])
                .then((values) => {
                    res.status(200).json({message: strings.names["W"]});
                })
        }
    });
}

module.exports = {
    newMemePage: newMemePage,
    getMemePage: getMemePage,
    searchMemePage: searchMemePage,
    getUserMemePage: getUserMemePage,
    updateMemePage: updateMemePage,
    deleteMemePage: deleteMemePage,
}