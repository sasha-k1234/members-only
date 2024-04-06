const { body, validationResult } = require("express-validator");

exports.validateReg = [
  body("username", "username cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "password length must be at least 3 charachters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("confirmPassword", "passwords dont match").custom(
    (value, { req }) => value === req.body.password
  ),

  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = errors.array();
      err.message = "Validation Error!";
      return next(err);
    }
     next();
  },
];
