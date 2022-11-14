import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// User model
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user based on email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }
    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmedPassword } = req.body;

  try {
    /* const existingUser = await User.findOne({ email }); */
    //check if the user exists
    /* if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    } */
    // check passwords
    if (password !== confirmedPassword) {
      return res.status(400).json({ message: "Passwords don't match." });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    //create user
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    //create token
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(201).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
};
