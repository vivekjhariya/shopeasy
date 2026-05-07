import mongoose from "mongoose";
import Product from "@/lib/models/product";

export const normalizeQuantity = (value: unknown): number | null => {
  const quantity = Number(value);

  if (!Number.isInteger(quantity) || quantity < 1) {
    return null;
  }

  return quantity;
};

export const findProductByPublicId = async (productId: unknown) => {
  if (typeof productId !== "string" || !productId.trim()) {
    return null;
  }

  const id = productId.trim();
  const queries: Array<Record<string, string>> = [{ originalId: id }];

  if (mongoose.Types.ObjectId.isValid(id)) {
    queries.push({ _id: id });
  }

  return Product.findOne({ $or: queries });
};
