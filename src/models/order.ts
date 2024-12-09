import mongoose, { Schema, Document, Model } from "mongoose";

interface IOrderItem {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
  totalAmount: number;
}

export interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  orderItems: IOrderItem[];
  status: string;
  payment: string;
}

const orderItemSchema = new Schema<IOrderItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

const orderSchema: Schema<IOrder> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [orderItemSchema],
  status: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
});

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
