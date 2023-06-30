// use switch for all cart items
// token based
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user";
import { connectToDB } from "@/config/db/db";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      return getUsers(res); //only admin
    }
    case "POST": {
      return createUser(req, res);
    }
  }
}

// Getting all Users.
async function getUsers(res: NextApiResponse) {
  try {
    await connectToDB();
    let users = await User.find({});
    return res.json({
      message: JSON.parse(JSON.stringify(users)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error,
      success: false,
    });
  }
}

//  Sign up new user - a verified registered user
const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDB();
    const { name } = req.body;
    const existingUser = await User.findOne({ name });
    const userCount = await User.count({});

    if (existingUser) {
      return res.status(400).json({
        error: "name already exist",
      });
    } else {
      //   const addedUser = await User.create(req.body);
      //   const quizuser = {
      //     _id: addedUser._id,
      //     username: addedUser.username,
      //     createdDate: addedUser.createdDate,
      //     category: addedUser.category,
      //     image: addedUser.image,
      //     userNo: userCount + 1,
      //   };
      //   res.status(201).json({ message: "successful", quizuser });
    }
  } catch (error) {
    res.json(error);
  }
};
