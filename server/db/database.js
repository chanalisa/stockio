const chalk = require("chalk");
const Sequelize = require("sequelize");

const pkg = require("../../package.json");

console.log(chalk.yellow("Opening database connection..."));

// establishing a connection to the Postgres database by creating a Sequelize instance (db)
const db = new Sequelize(`postgres://localhost:5432/${pkg.name}`, {
  logging: false, // SQL query logging
});

module.exports = db;
