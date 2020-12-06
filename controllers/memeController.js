let memePageModel = require('../models/memePageModel');
let memeModel = require('../models/memeModel');
const strings = require('./string');
const http = require('http');

newMeme = (req,res) =>{
    if(!req.params.meme_id) return res.status(400).json({message:strings.names["B"]});
    if(!req.body.image) return res.status(400).json({message:strings.names["C"]});
    if(!req.body.content) return res.status(400).json({message:strings.names["E"]});

    let memePage = memePageModel.getMemePageById(req.params.meme_id);
    memePage.then(([data, meta]) => {
        if(!data[0]){
            res.status(404).json({message: strings.names["F"]});
        } else if(data[0].author_id != req.user.id){
            return res.status(401).json({message:strings.names["G"]});
        } else {
            memeModel.newMeme(req.params.meme_id, req.body.content, req.body.image)
                .then(([data, meta]) => {
                    res.status(201).json({
                        uri: `/api/v1/memePage/${req.params.meme_id}/meme/${data.insertId}`,
                        id: data.insertId,
                        text: req.body.content,
                        image: req.body.image
                    });
                });
        }
    });
}

getMemePageMeme = (req,res) => {
    if(!req.params.meme_id) return res.status(400).json({message:strings.names["H"]});

    let memePage = memePageModel.getMemePageById(req.params.meme_id);
    memePage.then(([data, meta]) => {
        if(!data[0]){
            res.status(404).json({message: strings.names["F"]});
        } else if(data[0].author_id != req.user.id){
            return res.status(401).json({message:strings.names["G"]});
        } else {
            memeModel.findMeme(req.params.meme_id)
                .then(([data, meta]) => {
                    let response = data.map((memePage)=>{
                        memePage.uri = `/api/v1/memePage/${req.params.meme_id}/meme/${meme.id}`;
                        return quiz;
                    })
                    res.status(200).json(response);
                });
        }
    });
}

getMeme = (req,res) =>{
    console.log("INNNN HERE");
    if(!req.params.id) return res.status(400).json({message:strings.names["I"]});
    let meme = memeModel.getMemeById(req.params.id);
    meme.then(([data, meta]) => {
        if(!data[0]){
            res.status(404).json({message: strings.names["L"]});
        } else {
            let q = data[0];
            q.uri = `/api/v1/memePage/meme/${q.id}`;
            res.status(200).json(q);
        }
    });
}

deleteMemePage = (req,res) => {
    if(!req.params.params.id) return res.status(400).json({message:strings.names["I"]});
    if(!req.params.meme_id) return res.status(400).json({message:strings.names["H"]});
    if(!req.body.content && !req.body.image) return res.status(400).json({message:strings.names["J"]});
   
    let memePage = memePageModel.getMemePageById(req.params.meme_id);
    memePage.then(([data, meta]) => {
        if(!data[0]){
            res.status(404).json({message: strings.names["F"]});
        } else if(data[0].author_id != req.user.id){
            return res.status(401).json({message:strings.names["G"]});
        } else {
            memeModel.updateMeme(req.params.id, req.body)
                .then(([data, meta]) => {
                    res.status(200).json({message: strings.names["K"]});
                });
        }
    });
}

deleteMeme = (req,res) => {
    if(!req.params.params.id) return res.status(400).json({message:strings.names["I"]});
    if(!req.params.meme_id) return res.status(400).json({message:strings.names["H"]});
    let meme = memeModel.getMemeById(req.params.id);
    meme.then(([data, meta]) => {
        if(!data[0]){
            res.status(404).json({message: strings.names["L"]});
        } else {
            const q = data[0];
            if(q.meme_id != req.params.meme_id){
                return res.status(400).json({message:strings.names["M"]});
            }
            memePageModel.getMemePageById(q.meme_id)
                .then(([data, meta]) => {
                    if(data[0].author_id != req.user.id){
                        return res.status(401).json({message:strings.names["G"]});
                    } else {
                        memeModel.deleteMeme(req.params.id)
                            .then(([data,meta])=>{
                                res.status(200).json({message: strings.names["N"]});
                            });
                    }
                    
                });
        }
    });
}

memeList = (req, res) => 
{
    var url = "http://api.giphy.com/v1/gifs/search?api_key=qF9pp6xP32yEqyguSGNHYDKfUaAXJYQC&q=lol&limit=25&offset=0&rating=g&lang=en";
    var parsed;
    http.get(url, (response) => {
        // SET ENCODING OF RESPONSE TO UTF8
        response.setEncoding('utf8');
        let body = '';
        // listens for the event of the data buffer and stream
        response.on('data', (d) => {
            // CONTINUOUSLY UPDATE STREAM WITH DATA FROM GIPHY
             body += d;
        });
        // once it gets data it parses it into json 
        response.on('end', () => {
            // WHEN DATA IS FULLY RECEIVED PARSE INTO JSON
            parsed = JSON.parse(body);
            console.log("PARSED", parsed);
            // RENDER THE TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
            res.send(parsed)
        });
    });

}


module.exports = {
    newMeme: newMeme,
    getMemePageMeme: getMemePageMeme,
    getMeme: getMeme,
    deleteMemePage: deleteMemePage,
    deleteMeme: deleteMeme,
    memeList: memeList
}