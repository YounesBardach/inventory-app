import { body, validationResult } from "express-validator";

export const supplierValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Supplier name is required")
    .isString()
    .withMessage("Supplier name must be a string"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isString()
    .withMessage("Phone number must be a string")
    .matches(
      /^\+?\d{1,3}?[-. ]?\(?\d{1,4}?\)?[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/
    )
    .withMessage("Phone number must be a valid format"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),
];

export { validationResult };
