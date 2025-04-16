import { redirect } from "next/navigation";

import { stripe } from "../../lib/stripe";

type parmsy = {
  searchParams: {
    session_id?: string;
  };
};

export default async function Success({ searchParams }: parmsy) {
  const { session_id } = searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  try {
    const { status, customer_details } =
      await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "payment_intent"],
      });

    if (status === "open") {
      return redirect("/");
    }

    if (status === "complete") {
      return (
        <section id="success">
          <p>
            We appreciate your business! A confirmation email will be sent to{" "}
            {customer_details?.email || "your email address"}. If you have any
            questions, please email{" "}
          </p>
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </section>
      );
    }
    return null;
  } catch (error) {
    return (
      <section className="max-w-6xl mx-auto p-10 text-center border m-10 rounded-md bg-red-50">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          {" "}
          Error processing payment{" "}
        </h2>
        <p>
          Theere wwas ana issue verifying your payment. Please Contact support
        </p>
      </section>
    );
  }
}
