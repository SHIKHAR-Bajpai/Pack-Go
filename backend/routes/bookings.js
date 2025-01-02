import express from "express"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"
import { createBooking, getAllbooking, getbooking } from "../controllers/bookingController.js"
import { initiatePayment } from "../controllers/initiatePayment.js"
import { verifyPayment } from "../middlewares/verifyPayment.js"
const router =express.Router()

router.get('/', verifyAdmin, getAllbooking )
router.post('/new', verifyUser , initiatePayment )
router.post('/payment-success', verifyUser , verifyPayment , createBooking )
router.get('/:id', verifyUser , getbooking )


export default router