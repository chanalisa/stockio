const router = require("express").Router();

const User = require("../db/models").User;
const Portfolio = require("../db/models").Portfolio;
const Transaction = require("../db/models").Transaction;

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

// buy stock: add to portfolio & create new record in transactions
router.put("/", async (req, res, next) => {
  try {
    const newTransaction = await Transaction.create(req.body);
    const stock = await Portfolio.findOne({
      where: {
        ticker: newTransaction.ticker,
      },
    });
    if (stock) {
      stock.update({
        quantity: stock.quantity + newTransaction.quantity,
      });
      res.json(stock);
    } else {
      const newStock = await Portfolio.create(newTransaction);
      res.json(newStock);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
