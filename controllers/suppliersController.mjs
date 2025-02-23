import * as suppliersQueries from "../db/suppliersQueries.mjs";
import asyncHandler from "express-async-handler";
import {
  supplierValidationRules,
  validationResult,
} from "../validations/supplierValidation.mjs";

export const getAllSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await suppliersQueries.getAllSuppliers();
  console.log("fetched suppliers", suppliers);
  res.render("suppliers", {
    suppliers,
    title: "Suppliers",
    errors: [],
  });
});

export const getSupplier = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const supplier = await suppliersQueries.getSupplier(id);
  console.log("fetched supplier", supplier);
  res.render("supplierEdit", { supplier, title: "Supplier Edit", errors: [] });
});

export const addSupplier = [
  ...supplierValidationRules,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const suppliers = await suppliersQueries.getAllSuppliers();
      return res.render("suppliers", {
        title: "Suppliers",
        errors: errors.array(),
        formData: req.body,
        suppliers,
      });
    }

    const { name, phone, email } = req.body;
    const newSupplier = await suppliersQueries.addSupplier(
      name,
      phone,
      email
    );
    console.log("added supplier", newSupplier);
    res.redirect("/suppliers");
  }),
];

export const updateSupplier = [
  ...supplierValidationRules,
  asyncHandler(async (req, res, next) => {
    console.log("Original method:", req.method);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { id } = req.params;
      const supplier = await suppliersQueries.getSupplier(id);
      return res.render("supplierEdit", {
        title: "Supplier Edit",
        errors: errors.array(),
        formData: req.body,
        supplier,
      });
    }

    const { id } = req.params;
    const { name, phone, email } = req.body;
    const updatedSupplier = await suppliersQueries.updateSupplier(
      id,
      name,
      phone,
      email
    );
    console.log("updated supplier", updatedSupplier);
    res.redirect("/suppliers");
  }),
];

export const deleteSupplier = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("Deleting supplier with id:", id);
  const deletedSupplier = await suppliersQueries.deleteSupplier(id);
  console.log("deleted supplier", deletedSupplier);
  res.redirect("/suppliers");
});
