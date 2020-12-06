let db = require('../util/database');

function newUser(username, email, password) {
    return db.execute(`Insert into user(username, email, password) VALUES('${username}', '${email}', '${password}')`);
}

function findUser(username,password) {
    return db.execute(`Select * from user where username='${username}' and password='${password}'`);
}

function userNameTaken(username){
    return db.execute(`Select id from user where username='${username}'`);
}

function getUserById(id) {
    return db.execute(`Select * from user where id =${id}`);
}

function updateUser(id, values) {
    let query = `Update user SET `
    if(values.name) query += `username = '${values.name}', `;
    if(values.email) query += `email = '${values.email}', `;
    if(values.password) query += `password = '${values.password}', `;
    query = query.substring(0, query.length - 2);
    query += `where id = ${id}`;
    return db.execute(query);
}

function deleteUser(id) {
    return db.execute(`DELETE from user where id =${id}`);
}

module.exports = {
    newUser: newUser,
    findUser: findUser,
   getUserById: getUserById,
   userNameTaken: userNameTaken,
   updateUser: updateUser,
   deleteUser: deleteUser,
}