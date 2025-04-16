"use client";
import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Button } from "@/components/ui/button";

type CheckoutPageProps = {
  amount: number;
  
}

export default function CheckoutPage({ amount }: CheckoutPageProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // need to generate new key for everytime the client switches betwween payment options, one key for apple, second key for google pay, third : etc.
  // this allows us to  process the payment
  useEffect(() => {

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount)}),
    })
    // pass the information aand get the clients data
    .then((res) => res.json())
    .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);
  


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!stripe || !elements || !clientSecret) {
      return;
    }
    // check for validation error, if theres any errors in the info that the client provided us with in the 
    // client payment form
    const { error: submitError } = await elements.submit()
    setIsLoading(true);

    if (submitError)  {
      setErrorMessage(submitError.message ?? "Submission Error");
      setIsLoading(false);
      return;
    }
    // confirm payment, then we can actually charge the user for the transactions
    const { error } = await stripe.confirmPayment ({
      elements,
      clientSecret,
      confirmParams : {
        return_url: `${window.location.origin}/success`,
      }
    })

  
    if (error) {
      setErrorMessage(error.message || "Payment failed");
    }
    
    setIsLoading(false);

    // Get a reference to a CardElement
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setErrorMessage("Card element not found");
      setIsLoading(false);
      return;
    }

    // Create payment method
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: cardElement,
    // });

    if (error) {
      setErrorMessage(error.message ?? "An unknown error occurred");
      setIsLoading(false);
      return;
    }

    // Here you would typically call your backend API to create a payment and im not aat that j yet
    // super important becuaase payments are not happening yet  andd we need this to process actuall payments
    // For example:
    // const response = await fetch('/api/create-payment', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ 
    //     paymentMethodId: paymentMethod.id,
    //     amount: amount * 100 // Convert to cents
    //   })
    // });
    
    // For now, just show success message
    // alert(`Payment method created successfully: ${paymentMethod.id}`);
    setIsLoading(false);
  };

  return (
    <div className="mt-8 p-6 bg-white rounded shadow-md text-black max-w-md mx-auto">
     {/* <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-4">lolzy</h3>

      </form> */}
      {clientSecret  && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div> }
      <Button>Pay</Button>
  
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Card Details
          </label>
          <div className="border rounded p-3 bg-gray-50">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>
        
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        
        <button 
          type="submit" 
          // disabling button if the stripe has not loaded yet (as of nowww the button loads instantly)
          disabled={!stripe || isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading ? "Processing..." : `Pay $${amount}`}
        </button>
      </form> 
     </div> 
      );
}