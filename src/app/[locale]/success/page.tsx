export default async function PaymentSuccess({
  searchParams: { amount, session_id },
} : {
  searchParams : { amount?: string; session_id?: string };
}) {
  // Generate a confirmation number if not provided
  const confirmationId = await session_id?.substring(0, 8) || `INV-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const orderTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <main className="max-w-4xl mx-auto my-12 p-8 text-center">
      {/* Success Card */}
      <div className="bg-gradient-to-tr from-red-950 to-red-900 rounded-xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="p-8 pb-2">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-10 h-10 text-green-400">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold mb-2 text-white">Thank You!</h1>
          <h2 className="text-xl text-red-200">Your payment was successful</h2>
        </div>

        {/* Amount Display */}
        <div className="flex justify-center my-6">
          <div className="bg-white p-4 px-8 rounded-full text-black text-5xl font-bold shadow-lg">
            ${amount || "59.99"}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-black/20 p-6 text-left">
          <h3 className="text-xl font-semibold mb-4 text-white text-center">Order Details</h3>
          
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto text-red-100">
            <div className="text-red-200">Confirmation #:</div>
            <div className="font-medium text-white">{confirmationId}</div>
            
            <div className="text-red-200">Date:</div>
            <div className="font-medium text-white">{orderDate}</div>
            
            <div className="text-red-200">Time:</div>
            <div className="font-medium text-white">{orderTime}</div>
            
            <div className="text-red-200">Payment Method:</div>
            <div className="font-medium text-white">Credit Card</div>
          </div>
        </div>

        {/* Receipt and Contact Info */}
        <div className="p-6 text-center text-red-200 text-sm">
          <p>A receipt has been sent to your email address.</p>
          <p className="mt-2">If you have any questions, please contact our support team.</p>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-0 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/en" className="inline-flex items-center justify-center px-6 py-3 bg-red-800 hover:bg-red-700 text-white font-medium rounded-md transition-colors">
            Return to Home
          </a>
          <button className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-100 text-red-900 font-medium rounded-md transition-colors">
            View Receipt
          </button>
        </div>
      </div>

      {/* Product Details Section - Can be expanded with actual items */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Your Purchase</h3>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-md mr-4"></div>
              <div className="text-left">
                <h4 className="font-medium text-gray-800">Website Development</h4>
                <p className="text-gray-500 text-sm">Professional Web Services</p>
              </div>
            </div>
            <div className="font-bold text-gray-800">${amount || "59.99"}</div>
          </div>
          
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${amount || "59.99"}</span>
            </div>
            <div className="flex justify-between text-gray-600 mt-2">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800 mt-4 pt-4 border-t border-gray-200">
              <span>Total</span>
              <span>${amount || "59.99"}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}