import { NextApiRequest, NextApiResponse } from "next";

import Cors from "micro-cors";
import Stripe from "stripe";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      res.status(400).send(`Webhook Error: ${errorMessage}`);
      return;
    }

    // Cast event data to Stripe object.
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
    } else if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cors(webhookHandler as any);
