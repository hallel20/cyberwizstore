import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Product } from "@/lib/models"
import { connectToDB } from "@/lib/utils";

const createPostSchema = z.object({
  name: z.string().min(1, {message: "Product name is Required!"}).max(255),
  price: z.number({message: "Price must be an Integer"}).min(1, {message: "Product price is required"}).max(100000000),
  description: z.string().min(1, {message: "Product description is required!"}),
  stock: z.number({message: "Stock must be a number"}).min(0).max(99999, {message: "Stock cannot be greater than 99,999"}),
  images: z.array(z.object({_id: z.string(), imageUrl: z.string()})).min(1, {message: "Image is Required!"})
});

export const POST = async (req: NextRequest) => {  
  // Getting the Product data
  const body = await req.json()
  
  const validation = createPostSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  
  const { name, description, price, stock, category, images } = body
  const sku = name.toUpperCase().replaceAll(" ", "-") + (Math.random()* (1000000-1000) + 1000)
try {
  connectToDB()
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
  return NextResponse.json(newProduct, {status: 201})
} catch (ex) {
  console.log(ex);
  return NextResponse.json("Something went Wrong, Please Try again!", {status: 500});
}
};
