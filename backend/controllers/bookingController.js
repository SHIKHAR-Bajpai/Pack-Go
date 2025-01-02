import Booking from "../models/Booking.js"

export const createBooking = async (req, res) => {

    const { userEmail, tourName, fullName, guestSize, amount, phone } = req.body; 

    const newBooking = new Booking({
        userId: req.body.userId, 
        userEmail,
        tourName,
        fullName,
        guestSize,
        phone,
        amount,
        bookAt: new Date(), 
    });

    try {
        const savedBooking = await newBooking.save();
        res.status(200).json({ success: true, message: 'Your tour is booked', data: savedBooking });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' }); 
    }
}

export const getbooking = async (req, res) => {
    const id = req.params.id
    try {
        const book = await Booking.findById(id)
        res.status(200).json({ success: true, message: "successful", data: book })
    } catch (err) {
        res.status(404).json({ success: true, message: "not found" })
    }
}

export const getAllbooking = async (req, res) => {
    try {
        const books = await Booking.find({})
        return res.status(200).json({ success: true, message: "successful", data: books })
    } catch (err) {
        return res.status(500).json({ success: true, message: "internal server error" })
    }
}