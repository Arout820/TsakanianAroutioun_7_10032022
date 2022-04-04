const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'UserId non valable !';
    } else {
      console.log(decodedToken.id);
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: error || 'Requête non authentifiée !' });
  }
};
