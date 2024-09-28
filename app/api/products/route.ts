import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { z } from "zod";

const createPostSchema = z.object({
  name: z.string().min(1).max(255),
  price: z.number().min(1).max(10),
  description: z.string().min(1),
  categoryId: z.number(),
  stock: z.number().min(1).max(5),
  imageUrl: z.string().min(11).max(255),
});

export const POST = async (req: NextRequest) => {
  // getting the product images
  const formData = await req.formData();
  // console.log(formData)

  const file = formData.get("image[]") as File;
  if (!file) {
    return NextResponse.json({ error: "Image Cannot be empty!." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  const filePath = `/public/uploads/products/${filename}`;
  try {
    await writeFile(path.join(process.cwd(), filePath), buffer);
  } catch (error) {
    console.error("Error occured ", error);
    return NextResponse.json({ Message: "The Image could not be uploaded!"}, {status: 500 });
  }
  
  // Getting the Product data
  const imageUrl = `/uploads/products/${filename}`;

  const body = {
    name: formData.get("name") as string,
    price: parseInt(formData.get("price") as string),
    description: formData.get("description") as string,
    categoryId: parseInt(formData.get("categoryId") as string),
    stock: parseInt(formData.get('stock') as string),
    imageUrl
  }
  const validation = createPostSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newProduct = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
      description: body.description,
      categoryId: body.categoryId,
      image: imageUrl,
      sku: "123",
      stock: 20,
    },
  });

  return NextResponse.json(newProduct, {status: 201})
};

export const GET = async (req: NextRequest) => {
  return NextResponse.json([
    { id: 1, name: "Hello" },
    { id: 2, name: "Hallel" },
  ]);
};
