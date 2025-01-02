import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User' 
        },
        userEmail: {
            type: String,
        },
        tourName: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        guestSize: {
            type: Number,
            required: true,
        },
        amount: {
          type: Number,
          required: true,  
        },
        phone: {
            type: String,
            required: true,
        },
        bookingDate: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
