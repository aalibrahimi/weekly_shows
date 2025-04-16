"use client";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

type CheckoutPageProps = {
  amount: number;
}

export default function CheckoutPage({ amount }: CheckoutPageProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    setIsLoading(true);

    // Get a reference to a CardElement
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setErrorMessage("Card element not found");
      setIsLoading(false);
      return;
    }

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

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
    alert(`Payment method created successfully: ${paymentMethod.id}`);
    setIsLoading(false);
  };

  return (
    <div className="mt-8 p-6 bg-white rounded shadow-md text-black max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Custom Payment Form</h3>
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
          disabled={!stripe || isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading ? "Processing..." : `Pay $${amount}`}
        </button>
      </form>
    </div>
  );
}