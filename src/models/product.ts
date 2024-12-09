import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  rating?: number; 
  image: string[];
  numberAvailable: number;
}

const productSchema: Schema<IProduct> = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    max: 5,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  numberAvailable: {
    type: Number,
    required: true,
  },
});
const Product: Model<IProduct> = mongoose.model<IProduct>("Product", productSchema);
export default Product;
