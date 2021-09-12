const router = require('express').Router();
const bcrypt = require('bcryptjs')
const { JWT_SECRET } = require("../secrets")
const jwt = require('jsonwebtoken')
const Auth = require('./auth-model')
const {
  checkUsernameExists,
  validateBody,
  checkUsernameFree
} = require('./auth-middleware')

router.post('/register', checkUsernameFree, validateBody, (req, res, next) => {
  res.end('implement register, please!');
    const user = req.body
    const rounds = process.env.BCRYPT_ROUNDS || 8
    const hash = bcrypt.hashSync(user.password, rounds)
    user.password = hash
    Auth.insert(user)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
});

router.post('/login', validateBody, checkUsernameExists, (req, res) => {
  res.end('implement login, please!');
  let { password } = req.body;
  const user = req.user;
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = tokenBuilder(user);
    res.json({
      message: `${user.username} is back!`,
      token: token,
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

function tokenBuilder(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    role_name: user.role_name
  }
  const config = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, JWT_SECRET, config)
}

module.exports = router;