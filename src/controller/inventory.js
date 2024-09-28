import { v4 as uuidv4 } from "uuid";
import InventoryModel from "../model/inventory.js";

const CREATE_INVENTORY = async (req, res) => {
  try {
    const inventory = {
      title: req.body.title,
      officeId: req.body.officeId,
      count: req.body.count,
      imgUrl: req.body.imgUrl,
      id: uuidv4(),
      companyId: req.body.companyId,
    };

    const response = await new InventoryModel(inventory);

    await response.save();

    return res
      .status(201)
      .json({ message: "inventory was created", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const GET_COMPANY_INVENTORIES = async (req, res) => {
  try {
    // console.log("hittt")
    const response = await InventoryModel.find({
      officeId: req.body.officeId,
      // officeId: req.params.officeId,
    });

    return res.status(200).json({ inventories: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const GET_INVENTORY_BY_ID = async (req, res) => {
  try {
    const response = await InventoryModel.findOne({ id: req.params.id });

    return res.status(200).json({ inventory: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const DELETE_INVENTORY_BY_ID = async (req, res) => {
  try {
    const response = await InventoryModel.findOneAndDelete({
    // const response = await InventoryModel.findOne({
      id: req.params.id,
    });

    if(response.companyId !== req.body.companyId){  ///gali trinti tik tas kuris priklauso companijai
      return res.status(403).json({
        message: "we can only delete inventory that belongs to our company",
      });
    }

    if (!response) {
      return res.status(404).json({
        message: "This inventory does not exist, so you can not delete it",
      });
    }

    return res
      .status(200)
      .json({ message: "Inventory was deleted", inventories: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

export {
  CREATE_INVENTORY,
  GET_COMPANY_INVENTORIES,
  GET_INVENTORY_BY_ID,
  DELETE_INVENTORY_BY_ID,
};
