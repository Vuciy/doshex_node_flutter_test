const jwt = require("jwt-simple");
const config = require("../config/dbconfig");

module.exports = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    let token = req.headers.authorization.split(" ")[1];
    try {
      let user = jwt.decode(token, config.secret);
      if (user) {
        req.user = user;
        req.token = token;
        next();
        return;
      }
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Wrong token",
    });
  }
};
