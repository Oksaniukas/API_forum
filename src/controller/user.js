import { v4 as uuidv4 } from "uuid";
import CompanyModel from "../model/company.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const CREATE_COMPANY = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(req.body.password, salt);

    const company = {
      email: req.body.email,
      title: req.body.title,
      address: req.body.address,
      id: uuidv4(),
      password: hash,
    };

    const response = await new CompanyModel(company);

    await response.save();

    return res
      .status(201)
      .json({ message: "company was created", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const LOGIN = async (req, res) => {
  try {
    const company = await CompanyModel.findOne({ email: req.body.email });

    if (!company) {
      return res.status(401).json({ message: "Your email or password is bad" });
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      company.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Your email or password is bad" });
    }

    const token = jwt.sign(
      { email: company.email, companyId: company.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({ token: token , companyId: company.id});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const GET_COMPANY_BY_ID = async (req, res) => {
  try {
    const response = await CompanyModel.findOne({ id: req.params.id });

    await response.save();

    return res.status(200).json({ company: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const DELETE_COMPANY_BY_ID = async (req, res) => {
  try {
    const response = await CompanyModel.findOneAndDelete({
      id: req.params.id,
    });

    // await response.save();

    return res
      .status(200)
      .json({ message: "Company was deleted", company: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
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

export { CREATE_COMPANY, GET_COMPANY_BY_ID, LOGIN, DELETE_COMPANY_BY_ID, VALIDATE_LOGIN };
