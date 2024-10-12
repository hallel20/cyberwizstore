import { Category } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
    const param = useParams()
    const { id } = param;
    try {
      connectToDB();
      const category = await Category.findById(id);
      if (!category) {
  
        return NextResponse.json("Category does not exist!", {status: 404})
      } else {
        category.delete()
        revalidatePath("admin/categories");
        return NextResponse.json("Category deleted Successfully", {status: 204})
      }
    } catch (ex) {
      console.log("Failed to Delete Category");
      return NextResponse.json("Failed to delete category!", {status: 500})
    }
  };