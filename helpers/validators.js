const { check, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ message: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

const registerValidation = () => {
  return [
    check("name", "Name is required").notEmpty(),
    check("email", "Please use a valid Email").isEmail(),
    check(
      "password",
      "Please enter a password with 5 or more characters"
    ).isLength({ min: 5 }),
  ];
};

const loginValidation = () => {
  return [
    check("email", "Please use a valid Email").isEmail(),
    check(
      "password",
      "Please enter a password with 5 or more characters"
    ).isLength({ min: 5 }),
  ];
};

const todoValidator = () => {
  return [
    check("text", "text is required").notEmpty(),
    check("dueDate", "dueDate is required").notEmpty(),
];
};

const commentValidator = () => {
  return [check("text", "Text is required").notEmpty()];
};

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  todoValidator,
};
