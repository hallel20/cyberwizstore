"use server";

import { revalidatePath } from "next/cache";
import { Category, Product, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";

//Creating a new product

export const createProduct = async (formData) => {
  const { name, description, price, stock, sku, category, images } =
    Object.fromEntries(formData);
  try {
    connectToDB();
    const newProduct = new Product({
      name,
      description,
      price,
      stock, // Total stock, across all variants
      sku,
      category,
      images,
    });

    await newProduct.save();
  } catch (ex) {
    console.log(ex);
    throw new Error("Something went wrong, Please try again!");
  }
};

export const addProductVariants = async (data) => {
  try {
    connectToDB();
    await Product.findByIdAndUpdate(data._id, { variants: data.variants });
    revalidatePath(`admin/products/${data._id}`);
    redirect(`admin/products/${data._id}`);
  } catch (ex) {
    console.log(ex);
    throw new Error("Something went wrong, Please try again!");
  }
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
    revalidatePath("admin/products");
    redirect("admin/products");
  } catch (ex) {
    console.log("Failed to Delete Product");
  }
};

export const deleteCategory = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Category.findByIdAndDelete(id);
    revalidatePath("admin/categories");
    redirect("admin/categories");
  } catch (ex) {
    console.log("Failed to Delete Category");
  }
};

export const createUser = async (formData) => {};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await User.findByIdAndDelete(id);
    revalidatePath("admin/users");
    redirect("admin/users");
  } catch (ex) {
    console.log("Failed to Delete User");
  }
};
