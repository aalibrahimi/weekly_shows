"use client";
// import { Elements } from "@stripe/react-stripe-js";
import { useTranslations } from "next-intl";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import CheckoutPage from "@/MyComponents/stripe/CheckoutPage";


if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
}

type HomeProps = {
  searchParams: {
    canceled?: string;
  }
}


// starting up stripey
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// need to convert money to cents
const convertToSubcurrency = (amount: number) => Math.round(amount * 100);


export default function Home({ searchParams } : HomeProps) {
  
  // checking if the canceled paramater exist in url just in case a user cancels, (we need to have a cancellation page)
  const canceled = searchParams?.canceled === 'true';
  const t = useTranslations("HomePage");

  if ( canceled  ) {
    console.log(
      'Order canceled -- continue to s hopw around and checkout when ready.'
    )
  }
  // obv variablize it later
  const amount = 59.99 
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 roundedd-md bg-gradient-to-tr from-red-950/30 to bg-red-900">
      <h2 className="text-4xl font-bold text-black">Website Dev</h2>
      <h3 className="text-2xl">Requested 
        <span className="font-bold"> ${amount} </span>
      </h3>


      {/* simple form atm */}
      <form action="/api/checkout_sessions" method="POST">
      <section>
        <Button type="submit" role="link"
        className="bg-blue-500 hover:blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Checkout
        </Button>
      </section>
    </form>

{/* this is the stripe elements for custom checkout ( the option i picked in dashboard ) */}
    <Elements
    stripe={stripePromise}
    options={{
      mode: "payment",
      amount: convertToSubcurrency(amount),
      currency: "usd",
    }}
    > 
    <CheckoutPage amount={amount} />
    </Elements>

    </main>
  );
}

