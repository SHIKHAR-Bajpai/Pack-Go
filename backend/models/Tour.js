import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
       type: String,
       required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
        default: 0
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    orderId: { 
      type: Number, 
      required: true,
      default: 0
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);

