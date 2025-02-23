import { body, validationResult } from "express-validator";

export const productValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isString()
    .withMessage("Product name must be a string"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number"),

  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),
];

export { validationResult };
