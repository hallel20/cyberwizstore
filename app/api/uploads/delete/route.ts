import { Image } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const POST = async (req: NextRequest) => {
    // getting the sent image data
  const image = await req.json();
  //   console.log(formData)
  const imageUrl = `/public/${image.imageUrl as string}`
  const imagePath = path.join(process.cwd(), imageUrl)
  const imageId = image._id.toString()
    try {
    connectToDB()
    await Image.findByIdAndDelete(imageId)
    await fs.unlink(imagePath)
    return NextResponse.json("File Deleted Successfully!", {status: 200})
    } catch(ex) {
        console.log("Something went wrong", ex)
        return NextResponse.json("The Image could not be deleted!", {status: 500 });
    }
}