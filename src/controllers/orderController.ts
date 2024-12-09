import {Request,Response} from "express";
import Order from "../models/order";

export const addOrder=async(req:Request,res:Response):Promise<void>=>{
    const {userId,products,amount,paymentStatus}=req.body;
    try {
        const newOrder=await Order.create({
            userId,
            products,
            amount,
            paymentStatus
        });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json("an error occured");
    }
};

export const getOrders=async(req:Request,res:Response):Promise<void>=>{
    try {
        const orders=await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json("an error occured");
    }
};

export const getOrderById=async(req:Request,res:Response):Promise<void>=>{
    const {id}=req.params;
    try {
        const order=await Order.findById(id);
        if(!order){
            res.status(404).json("order not found");
        };
        res.status(200).json(order);}
    catch (error) {
        res.status(400).json("an error occured");
    }
}

export const deleteOrder=async(req:Request,res:Response):Promise<void>=>{
    const {id}=req.params;
    try {
        const order=await Order.findByIdAndDelete(id);      
        if(!order){
            res.status(404).json("order not found");
        }
        res.status(200).json("order has been deleted");
    } catch (error) {
        res.status(400).json("an error occured");
    }
}