import { Router } from "express";
import { addOrder, getOrders, getOrderById, deleteOrder } from "../controllers/orderController";

const router = Router();

router.route("/orders").get(getOrders).post(addOrder);     
router.route("/orders/:id").get(getOrderById).delete(deleteOrder); 
export default router;
