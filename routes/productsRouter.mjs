import { Router } from "express";
import * as productsController from "../controllers/productsController.mjs";

const productsRouter = Router();

productsRouter.get("/", productsController.getAllProducts);
productsRouter.get("/:id", productsController.getProduct);
productsRouter.post("/", productsController.addProduct);
productsRouter.put("/:id", productsController.updateProduct);
productsRouter.delete("/:id", productsController.deleteProduct);

export default productsRouter;
