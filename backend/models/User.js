const database = require('../config/db');

// Class user pour données à envoyer à la BDD
class User {
  constructor(firstname, lastname, email, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }

  save(user, result) {
    database.query('INSERT INTO user SET ?', user, (error, results) => {
      if (error) {
        result(error);
      } else {
        result(null, results);
      }
    });
  }

  static connect(email, result) {
    database.query(
      'SELECT user_id, email, password, isAdmin FROM user WHERE email = ?',
      email,
      (error, results) => {
        if (error) {
          result(error);
        } else {
          result(null, results);
        }
      }
    );
  }
  static getUser(userId, result) {
    database.query('SELECT * FROM user WHERE user_id = ?', userId, (error, results) => {
      if (error) {
        result(error);
      } else {
        result(null, results);
      }
    });
  }
}

module.exports = User;
