const Portfolio = require("./portfolio");
const Transaction = require("./transaction");
const User = require("./user");

/* ASSOCIATIONS */
User.hasMany(Transaction);
Transaction.belongsTo(User);

User.hasMany(Portfolio);
Portfolio.belongsTo(User);

module.exports = {
  Portfolio,
  Transaction,
  User,
};
