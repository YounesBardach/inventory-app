import * as productsQueries from "../db/productsQueries.mjs";
import asyncHandler from "express-async-handler";
import {
  productValidationRules,
  validationResult,
} from "../validations/productValidation.mjs";

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productsQueries.getAllProducts();
  console.log("fetched products", products);
  res.render("products", {
    products,
    title: "Products",
    errors: [],
  });
});

export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productsQueries.getProduct(id);
  console.log("fetched product", product);
  res.render("productEdit", { product, title: "Product Edit", errors: [] });
});

export const addProduct = [
  ...productValidationRules,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const products = await productsQueries.getAllProducts();
      return res.render("products", {
        title: "Products",
        errors: errors.array(),
        formData: req.body,
        products,
      });
    }

    const { name, price, quantity } = req.body;
    const newProduct = await productsQueries.addProduct(name, price, quantity);
    console.log("added product", newProduct);
    res.redirect("/products");
  }),
];

export const updateProduct = [
  ...productValidationRules,
  asyncHandler(async (req, res, next) => {
    console.log("Original method:", req.method);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { id } = req.params;
      const product = await productsQueries.getProduct(id);
      return res.render("productEdit", {
        title: "Product Edit",
        errors: errors.array(),
        formData: req.body,
        product,
      });
    }

    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const updatedProduct = await productsQueries.updateProduct(
      id,
      name,
      price,
      quantity
    );
    console.log("updated product", updatedProduct);
    res.redirect("/products");
  }),
];

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("Deleting product with id:", id);
  const deletedProduct = await productsQueries.deleteProduct(id);
  console.log("deleted product", deletedProduct);
  res.redirect("/products");
});
