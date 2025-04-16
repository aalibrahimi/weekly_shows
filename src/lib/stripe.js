import 'server-only'

import Stripe from 'stripe'
// double check laater
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY )