import { Request, Response } from "express";
import User from "../models/user";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, roll, email, password, number, address, profilePic } = req.body;
  try {
    const newUser = await User.create({
      name,
      roll,
      email,
      password,
      number,
      address,
      profilePic,
    });
    res.status(201).json(newUser); 
  } catch (error) {
    res.status(400).json("an error occured");
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json("an error occured");
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
   const user= await User.findByIdAndDelete(id)
    if(!user){
      res.status(404).json("user not found");
    }
    res.status(200).json("user has been deleted");
  } catch (error) {
    res.status(400).json("an error occured");
  }
};


