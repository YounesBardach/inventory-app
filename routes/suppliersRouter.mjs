import { Router } from "express";
import * as suppliersController from "../controllers/suppliersController.mjs";

const suppliersRouter = Router();

suppliersRouter.get("/", suppliersController.getAllSuppliers);
suppliersRouter.get("/:id", suppliersController.getSupplier);
suppliersRouter.post("/", suppliersController.addSupplier);
suppliersRouter.put("/:id", suppliersController.updateSupplier);
suppliersRouter.delete("/:id", suppliersController.deleteSupplier);

export default suppliersRouter;
