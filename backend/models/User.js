const database = require('../config/db');

class User {
  constructor(username, email, password, bio) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.bio = bio;
  }
}

module.exports = User;