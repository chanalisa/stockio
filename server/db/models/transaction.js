const Sequelize = require("sequelize");

const db = require("../database");

const Transaction = db.define("transaction", {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  companyName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // price in pennies
  priceAtTransaction: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },
  transactionType: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "buy",
    validate: {
      notEmpty: true,
    },
    values: ["buy"],
  },
});

module.exports = Transaction;
