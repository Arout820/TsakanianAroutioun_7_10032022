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
    const sql = 'INSERT INTO user SET ?';
    database.query(sql, user, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static connect(email, callback) {
    const sql = 'SELECT user_id, email, password, isAdmin FROM user WHERE email = ?';
    database.query(sql, email, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static getUser(userId, callback) {
    const sql = 'SELECT * FROM user WHERE user_id = ?';
    database.query(sql, userId, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static updateInfos(body, userId, callback) {
    const sql = 'UPDATE user SET ? WHERE user_id = ?';
    database.query(sql, [body, userId], (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static updatePhoto(userPhoto, userId, callback) {
    const sql = 'UPDATE user SET user_photo = ? WHERE user_id = ?';
    database.query(sql, [userPhoto, userId], (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static getAllImagesPosted(userId, callback) {
    const sql = 'SELECT attachment FROM post WHERE user_id = ?;';
    database.query(sql, userId, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static getUserPhoto(userId, callback) {
    const sql = 'SELECT user_photo FROM user WHERE user_id = ?';
    database.query(sql, userId, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }

  static delete(userId, callback) {
    const sql = 'DELETE FROM user WHERE user_id = ?';
    database.query(sql, userId, (error, results) => {
      if (error) callback(error);
      else callback(null, results);
    });
  }
}

module.exports = User;
