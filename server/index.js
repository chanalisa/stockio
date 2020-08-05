const path = require("path");
const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 8080;

// logging middleware
app.use(morgan("dev"));

// bodyparsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
