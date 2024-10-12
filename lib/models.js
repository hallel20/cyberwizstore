import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "user" },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Variant Schema (Embedded in Product)
const variantSchema = new mongoose.Schema({
  variantName: { type: String, required: true }, // e.g., "Size" or "Color"
  variantOption: { type: String, required: true }, // e.g., "Medium" or "Red"
  priceModifier: { type: Number, default: 0 }, // Adjusts the base price
  stock: { type: Number, default: 0 }, // Stock specific to this variant
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Images Database Schema
const imageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
});

// Product Schema with Embedded Variants
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true }, // Base price before modifiers
  stock: { type: Number, default: 0 }, // Total stock across variants
  sku: { type: String, unique: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  images: [imageSchema],
  variants: [variantSchema], // Embedded array of variants
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Order Item Schema
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  variant: {
    // Variant purchased
    variantName: String,
    variantOption: String,
  },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true }, // Price at the time of order
  totalPrice: { type: Number, required: true }, // unitPrice * quantity
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Order Schema
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "Pending" },
  totalPrice: { type: Number, required: true },
  items: [orderItemSchema], // Embedded array of order items
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Models
export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
export const Image =
  mongoose.models.Image || mongoose.model("Image", imageSchema);
