const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  let self = this;

  if (self.isModified("password") || self.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(self.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }

        self.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePasswords = function (pass, callback) {
  bcrypt.compare(pass, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
