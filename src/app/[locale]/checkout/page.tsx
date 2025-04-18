"use client";
// import { Elements } from "@stripe/react-stripe-js";
import { useTranslations } from "next-intl";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import CheckoutPage from "@/MyComponents/stripe/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useSearchParams } from "next/navigation";
import { useCheckoutStore } from "@/stores/store";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

// starting up stripey
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const { itemprice, itemname } = useCheckoutStore();
  const searchParams = useSearchParams();
  // checking if the canceled paramater exist in url just in case a user cancels, (we need to have a cancellation page)
  const canceled = searchParams.get("canceled") === "true";
  const itemPrice = searchParams.get("price") === String(itemprice);
  const paramItemName = itemname.replace(' ', '%20')
  const itemName = searchParams.get("name") === paramItemName;

  const t = useTranslations("HomePage");

  if (canceled) {
    console.log("Order canceled -- continue to go to the cancellation page.");
  }

  if (!itemPrice && !itemName) {
    return (
      <div className="">Invalid Params</div>
    )
  }

  // obv variablize it later
  // const amount = 59.99;
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center m-10 roundedd-md ">
      <h2 className="text-4xl font-bold text-black">{itemname}</h2>
      <h3 className="text-2xl">
        Requested
        <span className="font-bold"> ${itemprice} </span>
      </h3>

      {/* simple form atm */}
      <form action="/api/checkout_sessions" method="POST">
        <section>
          <Button
            type="submit"
            role="link"
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
          amount: convertToSubcurrency(itemprice), // cents
          currency: "usd",
        }}
      >
        <CheckoutPage amount={itemprice} />
      </Elements>
    </main>
  );
}
