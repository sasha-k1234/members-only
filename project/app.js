const createError = require("http-errors");
const express = require("express");
const path = require("path");

const logger = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStartegy = require("passport-local");
const User = require("./models/User");

const userRouter = require("./routes/userRouter");
const messageRouter = require("./routes/MessageRoter");

const app = express();

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const dbUrl = process.env.DB_URL;
const sessionSecret = process.env.SESSION_SECRET;

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(
  session({
    store: MongoStore.create({ mongoUrl: dbUrl, collectionName: "sessions" }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use("/", userRouter);
app.use("/user", userRouter);
app.use("/msg", messageRouter);

passport.use(
  new LocalStartegy((username, password, done) => {
    User.findOne({ username: username }, async (err, user) => {
      if (err) {
        done(err);
      }
      if (!user) {
        done(null, false, { msg: "Incorrect Username!" });
      }
      try {
        const res = await bcrypt.compare(password, user.password);
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { msg: "Wrong Password!" });
        }
      } catch (error) {
        done(err);
      }
    });
  })
);

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id,(err,user)=>{
    done(err,user);
  })
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
