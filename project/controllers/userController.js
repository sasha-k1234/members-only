const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

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
    req.flash('success','You have successfully registered')
    res.redirect("/user/login");
  } catch (error) {
    next(error);
  }
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = (req, res) => {
  req.flash("success", "You have successfully logged in");
  res.redirect("/user/member");
};

exports.logout = (req, res, next) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
  });
  res.redirect("/user/login");
};

exports.getMember = (req, res) => {
  res.render("member");
};

exports.postMember = async (req, res) => {
  const { id, username } = req.user;
  const passcode = req.body.passcode;
  const user = { id, username };

  if (
    passcode !== process.env.MEMBER_PASS &&
    passcode !== process.env.ADMIN_PASS
  ) {
    req.flash("error", "Wrong try again");
    return res.redirect("/user/member");
  }
  if (passcode === process.env.MEMBER_PASS) {
    user.role = "member";
    req.flash("success", "You are now a member!");
  } else {
    user.role = "admin";
    req.flash("You are now a admin!");
  }
  
  await User.findByIdAndUpdate(id, user);
  res.redirect('/msg/write');
};
