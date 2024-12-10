import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, roll, email, password, number, address, profilePic } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      roll,
      email,
      password: hashedPassword,
      number,
      address,
      profilePic,
    });
    res.status(201).json(newUser); 
  } catch (error) {
    res.status(400).json( "An error occurred");  
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json("User not found" );
      return; 
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json("Invalid email or password" );
      return; 
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      JWT_SECRET!,
      {
        expiresIn: JWT_EXPIRES_IN || "1d",
      }
    );

    console.log("SECRET KEY IS", JWT_SECRET);
    console.log("Token is", token);

    res.cookie("token", token);
    res.status(200).json({
      statusCode: 200,
      message: "Login successful",
      success: true,
      token: token,
    }); 
  } catch (error) {
    res.status(400).json( "An error occurred"); 
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select("password");
    res.status(200).json(users); 
  } catch (error) {
    res.status(400).json( "An error occurred");
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json( "User not found" );
      return;
    }
    res.status(200).json( "User has been deleted" ); 
  } catch (error) {
    res.status(400).json( "An error occurred" ); 
  }
};