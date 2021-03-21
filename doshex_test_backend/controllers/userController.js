const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config/dbconfig");
const { validationResult } = require("express-validator");

const signUp = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }

  User.create(req.body)
    .then((newUser) => {
      login(req, res);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

const login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      user.comparePasswords(req.body.password, (err, isMatch) => {
        if (!err && isMatch) {
          let token = jwt.encode(user, config.secret);
          res.status(200).json({
            success: true,
            user,
            token,
          });
        } else {
          res.status(401).json({
            success: false,
            message: "Wrong password.",
          });
        }
      });
    })
    .catch((err) => {
      res.status(401).json({
        success: false,
        message: "User does not exist. ",
      });
    });
};

const getUser = (req, res) => {
  if (req.user) {
    return res.status(200).json({
      success: true,
      user: req.user,
      token: req.token,
    });
  }

  return res.status(401).json({
    success: false,
    message: "Unauthorized",
  });
};

module.exports = {
  signUp,
  login,
  getUser,
};
