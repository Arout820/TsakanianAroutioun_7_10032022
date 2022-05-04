const database = require('../config/db');

// Class user pour données à envoyer à la BDD
class User {
  constructor(firstname, lastname, email, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }

  save(user, callback) {
    database.query('INSERT INTO user SET ?', user, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static connect(email, callback) {
    database.query('SELECT user_id, email, password, isAdmin FROM user WHERE email = ?', email, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static getUser(userId, callback) {
    database.query('SELECT * FROM user WHERE user_id = ?', userId, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static updateInfos(body, userId, callback) {
    database.query('UPDATE user SET ? WHERE user_id = ?', [body, userId], (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static updatePhoto(userPhoto, userId, callback) {
    database.query('UPDATE user SET user_photo = ? WHERE user_id = ?', [userPhoto, userId], (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static delete(userId, callback) {
    database.query('DELETE FROM user WHERE user_id = ?', userId, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }
}

module.exports = User;
