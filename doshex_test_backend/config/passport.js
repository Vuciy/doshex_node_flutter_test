const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");
const config = require("./dbconfig");

module.exports = (passport) => {
  opts = {};

  opts.secretOrKey = config.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findById(jwt_payload.id)
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false);
        });
    })
  );
};
