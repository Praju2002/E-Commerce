import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import orderRouter from "./routes/orderRoutes";
import productRouter from "./routes/productRoutes";
import userRouter from "./routes/userRoutes";

const app=express();
app.use(express.json());

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.use("/api", orderRouter);   
app.use("/api", productRouter); 
app.use("/api", userRouter);

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});