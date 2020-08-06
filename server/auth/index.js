const router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("../db/models").User;

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    // if no user is found with the email provided
    if (!user) {
      console.log("No such user found: ", req.body.email);
      res.status(401).send("Wrong email and/or password");
      // use the User instance method to confirm if the entered password matches the encrypted password in the db
    } else if (!user.correctPassword(req.body.password)) {
      console.log("Incorrect password for user: ", req.body.email);
      res.status(401).send("Wrong email and/or password");
      // if the user successfully logs in provide a JWT
    } else {
      const token = await jwt.sign({ user }, "secretKey");
      res
        .status(200)
        .json({ user, token, message: "user successfully logged in" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = await jwt.sign({ user }, "secretKey");
    res.status(200).json({ user, token, message: "user successfully created" });
  } catch (error) {
    // if someone attempts to create an account with an email already in the db
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(error);
    }
  }
});

router.delete("/logout", (req, res, next) => {});

router.get("/me", (req, res) => {
  res.json(req.user);
});

module.exports = router;
