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
  priceAtTransaction: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
      max: 999999999,
      // price in pennies
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
