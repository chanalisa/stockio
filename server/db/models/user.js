const crypto = require("crypto");
const Sequelize = require("sequelize");

const db = require("../database");

const User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // user can only register once with any given email
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  // `.password` acts like a function to hide it when serializing to JSON - a work around Sequelize's lack of a "private" option
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return () => this.getDataValue("password");
    },
  },
  // `.salt` acts like a function to hide it when serializing to JSON - a work around Sequelize's lack of a "private" option
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    },
  },
  cash: {
    type: Sequelize.INTEGER,
    defaultValue: 500000,
  },
});

/* INSTANCE METHOD */

// check for correct password
User.prototype.correctPassword = function (enteredPassword) {
  return User.encryptPassword(enteredPassword, this.salt()) === this.password();
};

/* CLASS METHODS */

// generate salt
User.generateSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};

// salt password
User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

const setSaltAndPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;
