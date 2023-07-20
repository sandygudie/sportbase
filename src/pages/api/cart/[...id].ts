// use switch for all cart items
// not token based(you don't have to be login in to add things to cart , it's add checkout and payment we will tell you to sigin up )
// but it has to be personified

// /cart - returns unauthorized
// /cart/id - works
//  add items to the cart with this id

// use switch for all cart items
// add the cart as ref to user
import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDB } from "@/config/db/db";
import Cart from "@/models/cart";
import Product from "@/models/product";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      return getCart(req, res); //only admin
    }
    case "POST": {
      return createProduct(req, res);
    }
    case "PATCH": {
      return updateProduct(req, res);
    }
    case "DELETE": {
      return deleteProduct(req, res);
    }
  }
}
// get a User
async function getCart(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  try {
    await connectToDB();
    let cart = await Cart.findById(id);
    if (cart) {
      return res.status(200).json({
        data: cart,
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

// create product is adding a new product to array
const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDB();
    const {
      query: { id },
    } = req;

    // mongoose.Types.ObjectId.isValid("zzzzzzzzzzzz")) validate id, use mongoose validstor
    const newProduct = await Product.create(req.body);
    const existingCart = await Cart.findById(id);
    let cartId;
    if (existingCart) {
      existingCart.product.unshift(newProduct);
      // this id should be sent to cookies and not passed to the response object
      cartId = existingCart.id;
      existingCart.save();
    } else {
      const newCart = await Cart.create({});
      // setCookie("cartId", id, {
      //   req,
      //   res,
      //   maxAge: 60 * 60 * 24 * 7, // 1 week
      //   path: "/",
      // });

      newCart.product.unshift(newProduct);
      cartId = newCart.id;
      newCart.save();
    }
    return res.status(201).json({
      message: { newProduct, cartId },
      success: true,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDB();
    const {
      query: { id },
    } = req;
    const { qty, price } = req.body;

    const [cartId, productId]: string | any = id;
    const updatedproduct = await Product.findByIdAndUpdate(
      { _id: productId },
      {
        qty: qty,
        price: price,
        totalPrice: qty * price,
      },
      { new: true }
    );
    await Cart.updateOne(
      { _id: cartId, "product._id": id },
      {
        $set: {
          "product.$.qty": updatedproduct.qty,
          "product.$.price": updatedproduct.price,
          "product.$.totalPrice": updatedproduct.qty * updatedproduct.price,
        },
      }
    );
    return res.status(200).json({
      message: updatedproduct,
      success: true,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// create product is adding a new product to array
const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDB();
    const {
      query: { id },
    } = req;

    const [cartId, productId]: string | any = id;
    await Product.findByIdAndDelete(productId);
    await Cart.findByIdAndUpdate(cartId, {
      $pull: {
        product: {
          _id: productId,
        },
      },
    });
    return res.status(200).json({
      message: "product deleted",
      success: true,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
