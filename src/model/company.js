import mongoose from "mongoose";

const companySchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("Company", companySchema);