import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Category } from "@/lib/models";
import {connectToDB} from "@/lib/utils"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { products } from "@/app/(admin)/admin/products/data";

const createPostSchema = z.object({
  name: z.string().min(1).max(255),
});

export const POST = async (req: NextRequest) => {
    try {
        connectToDB()
        const body = await req.json()
        console.log(body)
        const validation = createPostSchema.safeParse(body);
        if (!validation.success)
            return NextResponse.json(validation.error.errors, { status: 400 });
        
        const slug = body.name.toLowerCase().replaceAll(" ", "-")
        
        const newCategory = new Category({
            name: body.name,
            slug: body.slug.toLowerCase() || slug
        })
        await newCategory.save()
        
        revalidatePath("/admin/categories")
        return NextResponse.json(newCategory, {status: 201})
    } catch(ex) {
        console.log(ex)
        return NextResponse.json("Something went wrong, please try again!", {status: 500})
    }
};

export const GET = async (req: NextRequest) => {
  return NextResponse.json(products);
};


