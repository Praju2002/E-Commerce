import { Request,Response } from "express";
import Product from "../models/product";

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, price, description, category, rating, image, numberAvailable } = req.body;
    try {
        const newProduct = await Product.create({
            name,
            price,
            description,
            category,
            rating,
            image,
            numberAvailable
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json("an error occured");
    }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json("an error occured");
    }
};

export const getProdutById=async(req:Request,res:Response):Promise<void>=>{
    const {id}=req.params;
    try {
        const product=await Product.findById(id);
        if(!product){
            res.status(404).json("product not found");
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json("an error occured");
    }
}


export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json("product not found");
        }
        res.status(200).json("product has been deleted");
    } catch (error) {
        res.status(400).json("an error occured");
    }
};
