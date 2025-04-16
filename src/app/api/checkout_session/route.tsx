import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin') || '';

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // we gotta put the exact Price ID (for example, price_1234) of the product you want to sell 
          // if been editing the homedashboard so we'll figure out how to do so together
          // its in,  Stripe Dashboard under Products or when we create a new product/price.
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });

    if (!session.url) {
      throw new Error('Failed to create checkout session URL')
    }
    // getting error bc typescript caanot be null for url so needs an if statement first
    return NextResponse.redirect(session.url, 303);
  } catch (err : any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}