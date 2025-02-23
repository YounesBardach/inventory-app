import * as salesQueries from "../db/salesQueries.mjs";
import asyncHandler from "express-async-handler";
import {
  saleValidationRules,
  validationResult,
} from "../validations/saleValidation.mjs";

export const getAllSales = asyncHandler(async (req, res) => {
  const sales = await salesQueries.getAllSales();
  console.log("fetched sales", sales);
  res.render("sales", {
    sales,
    title: "Sales",
    errors: [],
  });
});

export const getSale = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const sale = await salesQueries.getSale(id);
  console.log("fetched sale", sale);
  res.render("saleEdit", { sale, title: "Sale Edit", errors: [] });
});

export const addSale = [
  ...saleValidationRules,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const sales = await salesQueries.getAllSales();
      return res.render("sales", {
        title: "Sales",
        errors: errors.array(),
        formData: req.body,
        sales,
      });
    }

    const { quantity_sold, total_sale, product_id } = req.body;
    const newSale = await salesQueries.addSale(
      quantity_sold,
      total_sale,
      product_id
    );
    console.log("added sale", newSale);
    res.redirect("/sales");
  }),
];

export const updateSale = [
  ...saleValidationRules,
  asyncHandler(async (req, res, next) => {
    console.log("Original method:", req.method);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { id } = req.params;
      const sale = await salesQueries.getSale(id);
      return res.render("saleEdit", {
        title: "Sale Edit",
        errors: errors.array(),
        formData: req.body,
        sale,
      });
    }

    const { id } = req.params;
    const { quantity_sold, total_sale, product_id } = req.body;
    const updatedSale = await salesQueries.updateSale(
      id,
      quantity_sold,
      total_sale,
      product_id
    );
    console.log("updated sale", updatedSale);
    res.redirect("/sales");
  }),
];

export const deleteSale = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("Deleting sale with id:", id);
  const deletedSale = await salesQueries.deleteSale(id);
  console.log("deleted sale", deletedSale);
  res.redirect("/sales");
});
