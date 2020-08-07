const { Portfolio } = require("../db/models");

const router = require("express").Router();

const User = require("../db/models").User;
const Portfolio = require("../db/models".Portfolio);

const getPortfolio = async (req, res, next) => {
  const stockPortfolio = Portfolio.findAll({
    where: { userId: req.user.id },
  });
  if (stockPortfolio) {
    req.portfolio = stockPortfolio;
    next();
  } else {
    req.portfolio = [];
  }
};

router.get("/");
