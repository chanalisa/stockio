const router = require("express").Router();
const axios = require("axios");

const User = require("../db/models").User;
const Portfolio = require("../db/models").Portfolio;
const Transaction = require("../db/models").Transaction;

const REACT_APP_API_TOKEN = process.env.REACT_APP_API_TOKEN;

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
const getStockInfo = async (req, res, next) => {
  const { data } = await axios.get(
    `https://sandbox.iexapis.com/stable/stock/${req.body.ticker}/quote?token=${REACT_APP_API_TOKEN}`
  );
  if (data) {
    req.stockInfo = data;
    next();
  } else {
    res.sendStatus(404);
  }
};

router.put("/", getStockInfo, async (req, res, next) => {
  try {
    // console.log(req.stockInfo);
    const newTransaction = await Transaction.create({
      ticker: req.stockInfo.symbol,
      companyName: req.stockInfo.companyName,
      priceAtTransaction: +req.stockInfo.latestPrice * 100,
      quantity: req.body.quantity,
      userId: req.body.user.id,
    });
    const stock = await Portfolio.findOne({
      where: {
        ticker: newTransaction.ticker,
        userId: req.body.user.id,
      },
    });
    if (stock) {
      stock.update({
        quantity: stock.quantity + newTransaction.quantity,
        currentPrice: +req.stockInfo.latestPrice * 100,
      });
      res.json(stock);
    } else {
      const newStock = await Portfolio.create({
        ticker: req.stockInfo.symbol,
        companyName: req.stockInfo.companyName,
        currentPrice: +req.stockInfo.latestPrice * 100,
        quantity: req.body.quantity,
        userId: req.body.user.id,
      });
      res.json(newStock);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
