const { body } = require("express-validator");

const validateUser = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("Email must be formatted properly.")
    .customSanitizer((value) => String(value).toLowerCase()),
  body("age")
    .trim()
    .optional({ values: "falsy" })
    .isInt({ min: 18, max: 120 })
    .withMessage("Age must be a number between 18 and 120.")
    .toInt(),
  body("bio")
    .trim()
    .isLength({ max: 200 })
    .withMessage("Bio must be 200 characters or fewer."),
];

module.exports = validateUser;
