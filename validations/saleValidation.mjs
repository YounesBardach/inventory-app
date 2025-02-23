import { body, validationResult } from "express-validator";
import * as productQueries from "../db/productsQueries.mjs";

export const saleValidationRules = [
  body("product_id")
    .isInt()
    .withMessage("Product ID must be an integer")
    .custom(async (value) => {
      const product = await productQueries.getProduct(value);
      if (!product) {
        throw new Error("Product not found");
      }
      return true;
    }),

  body("quantity_sold")
    .isInt({ min: 1 })
    .withMessage("Quantity sold must be a positive integer"),

  body("total_sale")
    .isFloat({ min: 0 })
    .withMessage("Total sale must be a non-negative number"),
];

export { validationResult };
