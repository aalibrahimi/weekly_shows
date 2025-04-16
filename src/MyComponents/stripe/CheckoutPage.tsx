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
        return_url: `${window.location.origin}/success?session_id=test&amount=${amount}`,
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
    <div className="mt-12 max-w-md mx-auto">
      <div className="bg-gradient-to-tr from-red-900 to-red-800 text-white rounded-t-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-1">Secure Checkout</h2>
        <p className="text-red-200 text-sm">Enter your payment details below</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-red-200">Amount:</span>
          <span className="text-3xl font-bold">${amount}</span>
        </div>
      </div>
      
      <div className="bg-white rounded-b-xl shadow-lg p-6 border border-red-200 text-black">
        {/* <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-bold mb-4">lolzy</h3>
        </form> */}
        
        {clientSecret && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-gray-800">Payment Method</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <PaymentElement />
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Card Details
            </label>
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-inner">
              <CardElement 
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                      iconColor: '#cc0000',
                    },
                    invalid: {
                      color: '#9e2146',
                      iconColor: '#fa755a',
                    },
                  },
                }}
              />
            </div>
          </div>
          
          {errorMessage && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md border border-red-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {errorMessage}
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Your payment information is encrypted and secure
          </div>
          
          <button 
            type="submit" 
            // disabling button if the stripe has not loaded yet (as of nowww the button loads instantly)
            disabled={!stripe || isLoading}
            className="w-full bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Pay ${amount}
              </>
            )}
          </button>
          
        </form>
      </div>
    </div>
  );
}