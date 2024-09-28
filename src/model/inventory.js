import mongoose from "mongoose";

const inventorySchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  officeId: { type: String, required: true },
  count: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  companyId: { type: String, required: true },
});

export default mongoose.model("Inventory", inventorySchema);
