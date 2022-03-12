const mysql = require('mysql2');
const path = require('path')
const dotenv = require ('dotenv');
dotenv.config({ path: path.join(__dirname, '../config/.env') });

// Server connnection
const database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

database.connect((error) => {
  if (error) {
    console.error('Connexion à MySQL échouée !' + error.stack);
    return;
  }
  console.log('Connexion à MySQL réussie !');
});

module.exports = database;