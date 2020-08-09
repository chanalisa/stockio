const router = require("express").Router();
const axios = require("axios");

const User = require("../db/models").User;
const Portfolio = require("../db/models").Portfolio;
const Transaction = require("../db/models").Transaction;

const BASE_URL = process.env.BASE_URL;
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

// middleware to collect current data for requested stock
const getStockInfo = async (req, res, next) => {
  console.log(
    BASE_URL + req.body.ticker + "/quote?token=" + REACT_APP_API_TOKEN
  );
  try {
    const { data } = await axios.get(
      BASE_URL + req.body.ticker + "/quote?token=" + REACT_APP_API_TOKEN
    );
    if (data) {
      req.stockInfo = data;
      next();
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
  }
};

// buy stock
router.put("/", getStockInfo, async (req, res, next) => {
  try {
    // create a new entry in the transactions table
    const newTransaction = await Transaction.create({
      ticker: req.stockInfo.symbol,
      companyName: req.stockInfo.companyName,
      priceAtTransaction: +req.stockInfo.latestPrice * 100,
      quantity: +req.body.quantity,
      userId: req.body.user.id,
    });
    // looks for an entry in the portfolios table
    const stock = await Portfolio.findOne({
      where: {
        ticker: newTransaction.ticker,
        userId: req.body.user.id,
      },
    });
    if (stock) {
      // if found, update the quantity
      stock.update({
        quantity: stock.quantity + newTransaction.quantity,
        currentPrice: +req.stockInfo.latestPrice * 100,
      });
      res.json(stock);
    } else {
      // if not, create a new entry in the portfolio table
      const newStock = await Portfolio.create({
        ticker: req.stockInfo.symbol,
        companyName: req.stockInfo.companyName,
        currentPrice: +req.stockInfo.latestPrice * 100,
        quantity: +req.body.quantity,
        userId: req.body.user.id,
      });
      res.json(newStock);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
