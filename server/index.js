const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

require("dotenv").config();

// Sequelize instance
const db = require("./db/database");

const app = express();
const PORT = 8080;
// const PORT = 80;

// logging middleware
app.use(morgan("dev"));

// bodyparsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// 404 error handler for any remaining requests with an extension (.js, .css, etc.)
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
    console.log(req.path);
  } else {
    next();
  }
});

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

async function startServer() {
  // sync database
  await db.sync();
  // start listening with express server once synced
  await app.listen(PORT, () =>
    console.log(`Server is listening on port: ${PORT}`)
  );
}

startServer();
