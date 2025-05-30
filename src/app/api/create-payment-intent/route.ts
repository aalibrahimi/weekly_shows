import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// end point
export async function POST(request:  NextRequest) {

    try {
        const { amount } = await request.json();

       const paymentIntent = await stripe.paymentIntents.create ({
            amount: amount,
            currency: "usd",
            // will automatically wwhaat available payments there are, google pay, apple pay, etc..
            automatic_payment_methods: { enabled : true },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret});
    } catch ( error ) {
        console.error("Internal Error:", error);
        console.log("Stripe loaded:", !!stripe);
       

        // handle other errors ( e.g network  issues, parsing errors)
        return NextResponse.json(
            {error: `Internal Server Errror: ${error}`},
            { status : 500  },
        );
        
    }
}