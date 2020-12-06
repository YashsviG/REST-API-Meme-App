let db = require('../util/database');

//Create
function newMeme(memeId, content, image = null){
    return db.execute(`Insert into memes(meme_id, content, image) VALUES(${memeId}, '${content}', '${image}')`);
}

//Read
function findMeme(memeId) {
    return db.execute(`Select * from memes where meme_id =${memeId}`);
}

function getMemeById(id) {
    return db.execute(`Select * from memes where id =${id}`);
}

//Update
function updateMeme(id, values) {
    let query = `Update memes SET `
    if(values.content) query += `content = '${values.content}', `;
    if(values.image) query += `image = '${values.image}', `;
    query = query.substring(0, query.length - 2);
    query += `where id = ${id}`;
    return db.execute(query);
}

//Delete
function deleteMeme(id) {
    return db.execute(`DELETE from Memes where id =${id}`);
}

function deleteAllMemes(memeId) {
    return db.execute(`DELETE from Memes where meme_id =${memeId}`);
}

module.exports = {
    newMeme: newMeme,
    findMeme: findMeme,
    getMemeById: getMemeById,
    updateMeme: updateMeme,
    deleteMeme: deleteMeme,
    deleteAllMemes: deleteAllMemes,
}