import { CheckOutRequest } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      let result: CheckOutRequest[] = req.body.map((ele: any) => ({
        price_data: {
          currency: "usd",
          unit_amount: Number(ele.price) * 100,
          product_data: {
            name: ele.name,
            images: [ele.imageUrl],
          },
        },
        quantity: ele.qty,
      }));
      let lineItems = [
        ...result,
        {
          price_data: {
            currency: "usd",
            unit_amount: 100,
            product_data: {
              name: "Shipping Cost",
            },
          },
          quantity: 1,
        },
      ];
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${req.headers.origin}/checkout?success=true`,
        cancel_url: `${req.headers.origin}/checkout?canceled=true`,
      });

      res.json({ id: session.id });
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
