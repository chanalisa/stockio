const router = require("express").Router();

const User = require("../db/models").User;
const Portfolio = require("../db/models").Portfolio;

// finds all instances of portfolio with given userId
router.post("/", async (req, res, next) => {
  try {
    const stockPortfolio = await Portfolio.findAll({
      where: { userId: req.body.id },
    });
    res.json(stockPortfolio);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
