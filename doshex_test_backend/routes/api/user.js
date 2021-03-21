const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const User = require("../../models/user");
const authMiddleware = require("../../middlewares/authMiddleware");
const userController = require("../../controllers/userController");

router.post(
  "/sign_up",
  body("firstName").not().isEmpty(),
  body("lastName").not().isEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("passwordConfirmation").isLength({ min: 6 }),
  body("email").custom((value) => {
    return User.find({ email: value }).then((user) => {
      if (user.length > 0) {
        return Promise.reject("E-mail already in use");
      }
    });
  }),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  userController.signUp
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  userController.login
);

router.get("/get_user", authMiddleware, userController.getUser);

module.exports = router;
