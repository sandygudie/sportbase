import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDB } from "@/config/db/db";
import Cart from "@/models/cart";
import Product from "@/models/product";
import Receipt from "@/models/receipt";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      return getReceipts(req, res); //only admin
    }
    case "POST": {
      return createReceipt(req, res);
    }
  }
}
// get a User
async function getReceipts(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  try {
    await connectToDB();
    let receipt = await Receipt.findById(id);
    if (receipt) {
      return res.status(200).json({
        data: receipt,
        success: true,
      });
    } else {
      return res.status(401).json({
        message: "unauthorize",
        success: false,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error,
      success: false,
    });
  }
}

// create receipt from cart
const createReceipt = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDB();
    const {
      query: { id },
    } = req;

    const existingCart = await Cart.findById(id);

    if (!existingCart) {
      res.status(400).json({ message: "Cart does not exist" });
    }
    let receiptItems = existingCart.product.splice(
      0,
      existingCart.product.length
    );

    const newReceipt = await Receipt.create({});
    newReceipt.product = [...newReceipt.product, ...receiptItems];
    newReceipt.cartID = existingCart._id;
    newReceipt.save();
    existingCart.save();
    return res.status(201).json({
      message: newReceipt,
      success: "Receipt created",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
