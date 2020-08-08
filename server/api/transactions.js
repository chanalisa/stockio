const router = require("express").Router();

const User = require("../db/models").User;
const Transaction = require("../db/models").Transaction;

// finds all instances of transaction with given userId
router.post("/", async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.body.id },
    });
    res.json(transactions);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
