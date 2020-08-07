const { Portfolio } = require("../db/models");
const { get } = require("../auth");

const router = require("express").Router();

const User = require("../db/models").User;
const Portfolio = require("../db/models").Portfolio;

router.get("/", async (req, res, next) => {
  try {
    const stockPortfolio = await Portfolio.findAll({
      where: { userId: req.user.id },
    });
    if (stockPortfolio) {
      req.portfolio = stockPortfolio;
    } else {
      req.portfolio = [];
    }
  } catch (error) {
    console.error(error);
  }
});
