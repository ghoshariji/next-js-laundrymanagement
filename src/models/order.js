import mongoose, { models, Schema } from "mongoose";

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hostel: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    jeans: {
      type: Number,
      required: true,
    },
    shirt: {
      type: Number,
      required: true,
    },
    scshirt: {
      type: Number,
      required: true,
    },
    bedsheet: {
      type: Number,
      required: true,
    },
    towel: {
      type: Number,
      required: true,
    },
    others: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isPlaced:{
      type:String,
      enum:["pending","accepted"],
      default:"pending"
    }
  },
  { timestamps: true }
);

const Order = models.Order ||  mongoose.model("Order", orderSchema);
export default Order;
