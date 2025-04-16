"use client";
// import { Elements } from "@stripe/react-stripe-js";
import { useTranslations } from "next-intl";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe } from "@stripe/stripe-js";


if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
}

type homeProps = {
  searchParam: {
    canceled?: string;
  }
}



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home({ searchParams } : any) {
  
  const canceled = searchParams?.canceled === 'true';
  const t = useTranslations("HomePage");

  if ( canceled  ) {
    console.log(
      'Order canceled -- continue to s hopw around and checkout when ready.'
    )
  }
  const amount = 59.99
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 roundedd-md bg-gradient-to-tr from-red-950/30 to bg-red-900">
      <h2 className="text-4xl font-bold text-black">Website Dev</h2>
      <h3 className="text-2xl">Requested 
        <span className="font-bold"> ${amount} </span>
      </h3>


      {/* form */}
      <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
    </form>

    <Elements
    stripe={stripePromise}
    Options={{
      mode: "payment"
      amount: convertToSubcurrency(amount)
      currency: "usd",
    }}
    > 
    <CheckoutPage amount={amount} />
    </Elements>

    </main>
  );
}

