import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const verifyPayment = async (req, res, next) => {
    const sessionId = req.query.session_id;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            req.paymentVerified = true;
            next(); 
        } else {
            res.status(400).json({ success: false, message: 'Payment not verified' });
        }
    } catch (err) {
        console.error('Error verifying payment:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};