const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getRegistration = (req, res) => {
  res.render("registration");
};

exports.postRegistration = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hashedPassword,
      role: "user",
    });

    await user.save();
    res.redirect("/user/login");
  } catch (error) {
    next(error);
  }
};

exports.getLogin = (req,res) => {
  res.render('login');
};

exports.postLogin = (req,res) => {
  res.redirect('/user/member');
};

exports.logout = (req,res) => {
  req.logout();
  res.redirect('/user/login');
};

exports.getMember = (req,res) => {
  
  res.render('member')
}
