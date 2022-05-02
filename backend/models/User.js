const database = require('../config/db');

// Class user pour données à envoyer à la BDD
class User {
  constructor(firstname, lastname, email, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
}

module.exports = {
  User,
  addUser,
};

/**
 * add user in database
 * @param {User} user
 * @throws Error
 * @returns {Boolean} true if succeed
 */
function addUser(user) {
  database.query('INSERT INTO user  SET ?', user, (error, results) => {
    if (error) throw error;
    return true;
  });
}
