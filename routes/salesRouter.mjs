import { Router } from "express";
import * as salesController from "../controllers/salesController.mjs";

const salesRouter = Router();

salesRouter.get("/", salesController.getAllSales);
salesRouter.get("/:id", salesController.getSale);
salesRouter.post("/", salesController.addSale);
salesRouter.put("/:id", salesController.updateSale);
salesRouter.delete("/:id", salesController.deleteSale);

export default salesRouter;
