import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const ReactAppBaseUrl = process.env.REACT_APP_BASE_URL;

export const initiatePayment = async (req, res, next) => {
    const { tourName ,  amount  } = req.body;

    const serviceFee = 10; 
    const totalAmount = amount + serviceFee;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: tourName,
                        },
                        unit_amount: totalAmount * 100, 
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${ReactAppBaseUrl}/thank-you?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${ReactAppBaseUrl}/success=false&session_id={CHECKOUT_SESSION_ID}`,
        });
        res.status(200).json({ success: true, session_url: session.url });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
