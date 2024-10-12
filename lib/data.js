import { Category, Product, User } from "./models";
import { connectToDB } from "./utils";

export const getProducts = async () => {
  const products = await Product.find();
  return products;
};

export const getProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (ex) {
    console.log(ex);
  }
};

export const getCategories = async () => {
  try {
    connectToDB();
    const categories = await Category.find();
    return categories;
  } catch (ex) {
    console.log(ex);
    throw new Error("Failed to fetch Categories!");
  }
};

export const getCategory = async (id) => {
  try {
    connectToDB();
    const product = await Category.findById(id);
    return product;
  } catch (ex) {
    console.log(ex);
  }
};

export const getUsers = async () => {
  try {
    connectToDB();
    const users = await User.find();
    return users;
  } catch (ex) {
    console.log(ex);
    throw new Error("Could not get Users from the database!");
  }
};
