import User from "../models/user.model.js";
import argon2 from "argon2";
import BadRequestError from "../../../shared/errors/bad-request-error.js";
import jwt from "jsonwebtoken";
import { config } from "../../../config/env.js";

export class AuthService {
  static async register(username, email, password, phone) {
    const hashedPassword = await argon2.hash(password);

    const user = await User.findOneAndUpdate(
      { email },
      {
        $setOnInsert: {
          username,
          password: hashedPassword,
          phone,
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      },
    );

    return user;
  }

  // login
  static async login(email, password) {
    const existingUser = await User.findOne({ email }).select("+password");

    if (
      !existingUser ||
      !(await argon2.verify(existingUser.password, password))
    )
      throw new BadRequestError("Invalid Credentials");

    const { _id, role } = existingUser;

    // generate token
    const token = await jwt.sign({ id: _id, email, role }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    return token;
  }
}
