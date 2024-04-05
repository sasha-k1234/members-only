const User = require("../models/User");
const validate = require("../utils/validation");
const bcrypt = require("bcrypt");

exports.getRegistration = (req, res) => {
  res.render("registration");
};

exports.postRegistration = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      role: "user",
    });

    await user.save();
    res.redirect("/user/login");
  } catch (error) {
    next(error);
  }
};
