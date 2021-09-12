const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')

module.exports = (req, res, next) => {
  const token = req.headers.authorization
  if(!token) {
    res.status(401).json({ message: "Token Required" });
  } else {
    jwt.verify(token, JWT_SECRET, (err,decoded) => {
      if (err) {
        res.status(401).json({ message: "Token invalid" });
      } else {
        req.decodedJwt = decoded;
        next()
      }
    })
  }
};
