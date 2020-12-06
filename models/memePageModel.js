let db = require('../util/database');

//Create
function createMemePage(title, authorId, description) {
    console.log("IN DBB");
    return db.execute(`Insert into MemePage(author_id, title, description) VALUES(${authorId}, '${title}', '${description}')`);
}

//Read
function findMemePage(queryString) {
    return db.execute(`Select * from MemePage where title LIKE '%${queryString.replace(/['"]+/g, '')}%'`);
}

function getMemePageById(id) {
    return db.execute(`Select * from MemePage where id =${id}`);
}

function getUserMemePage(userId){
    return db.execute(`Select * from MemePage where author_id =${userId}`);

}

//Update
function updateMemePage(id, values) {
    let query = `Update MemePage SET `
    if(values.title) query += `title = '${values.title}', `;
    if(values.description) query += `description = '${values.description}', `;
    query = query.substring(0, query.length - 2);
    query += ` where id = ${id}`;
    return db.execute(query);
}

//Delete
function deleteMemePage(id) {
    return db.execute(`DELETE from MemePage where id =${id}`);
}

module.exports = {
    createMemePage: createMemePage,
    findMemePage: findMemePage,
    getMemePageById: getMemePageById,
    getUserMemePage: getUserMemePage,
    updateMemePage: updateMemePage,
    deleteMemePage: deleteMemePage,
}