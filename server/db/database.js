const chalk = require("chalk");
const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const RDS_USER = process.env.RDS_USER;
const RDS_PASSWORD = process.env.RDS_PASSWORD;
const RDS_HOST = process.env.RDS_HOST;
const RDS_PORT = process.env.RDS_PORT;

console.log(chalk.yellow("Opening database connection..."));

// establishing a connection to the Postgres database by creating a Sequelize instance (db)
const db = new Sequelize(
  // `postgres://${RDS_USER}:${RDS_PASSWORD}@${RDS_HOST}:${RDS_PORT}/${pkg.name}`,
  `postgresql://localhost:5432/${pkg.name}`,
  {
    logging: false, // SQL query logging
  }
);

module.exports = db;
