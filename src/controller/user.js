import { v4 as uuidv4 } from "uuid";
import UserModel from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const REGISTER_USER = async function (req, res) {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.password 
    ) {
      return res.status(400).json({
        message: "you didn't provided necessary data",
      });
    }

    /***email validation */
    const email = req.body.email;
    const emailRegex = /@/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email must contain "@" symbol' });
    }
    // ======================

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email was registered" });
    }

    /***name validation */
    const capitalizeFirstLetter = (name) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    let name = req.body.name;
    name = capitalizeFirstLetter(name);
    // ======================

    /*** Password validation ***/
    const password = req.body.password;
    const passwordRegex = /^(?=.*[0-9]).{6,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long and contain at least one number",
      });
    }
    // ======================

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = {
      email: req.body.email,
      name: name ,
      id: uuidv4(),
      password: hash,
    };

    const newUser = await new UserModel(user);
    await newUser.save();

     // **Generate JWT token right after registration**
     const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      user: newUser,
      message: "new user was successfully registered and logged in", token
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error " });
  }
};

const LOGIN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Your  password is bad" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );  
   
    await user.save();

    return res
      .status(200)
      .json({ message: "successfully Login", token,  userId: user.id,  });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: " error during login " , error: err.message });
  }
};

const VALIDATE_LOGIN = async (req, res) => {
  try {
    
    return res
      .status(200)
      .json({ message: "USER OK" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};


export {
  REGISTER_USER,
  LOGIN,
  VALIDATE_LOGIN,
  };