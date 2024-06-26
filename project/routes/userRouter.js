const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const { validateReg } = require("../utils/validation");
const passport = require("passport");
const { isAuth } = require('../utils/middleware');

/* GET home page. */
userRouter.get("/", (req, res) => {
  res.render("main", { title: "Welcome" });
});

userRouter.post("/registration", validateReg, userController.postRegistration);

userRouter.get("/registration", userController.getRegistration);

userRouter.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/user/login" }),
  userController.postLogin
);

userRouter.get("/login", userController.getLogin);

userRouter.get("/logout", userController.logout);

userRouter.get("/member", isAuth, userController.getMember);

userRouter.post("/member", isAuth, userController.postMember);

module.exports = userRouter;
