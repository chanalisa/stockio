const router = require("express").Router();

const User = require("../db/models").User;
const Portfolio = require("../db/models").Portfolio;

router.get("/", async (req, res, next) => {
  try {
    console.log("back:", req.body);
    const stockPortfolio = await User.findOne({
      where: { id: req.body.id },
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

module.exports = router;
