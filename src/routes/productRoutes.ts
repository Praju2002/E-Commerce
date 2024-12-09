import express from "express";
import { addProduct, getProducts, getProdutById, deleteProduct } from "../controllers/productController";

const router = express.Router();

router.route("/products").get(getProducts).post(addProduct);      
router.route("/products/:id").get(getProdutById).delete(deleteProduct);

export default router;
