import ProductVariantModal from "@/components/products/ProductVariantModal";
import { getCategory, getProduct } from "@/lib/data";
import Image from "next/image";

const ProductEditPage = async ({ params }: { params: any }) => {
  const { id } = params;
  const product = await getProduct(id);
  const category = await getCategory(product.category);
  //   console.log(product);
  return (
    <div className=" mt-10">
      <div className="flex">
        <div className="w-5/12 overflow-hidden flex items-center justify-center">
          <Image
            src={product.images[0].imageUrl}
            width="250"
            height="250"
            alt={product.sku}
            priority
          />
        </div>
        <div className="w-7/12 flex flex-col justify-between">
          <h2 className="text-4xl font-bold py-2">{product.name}</h2>
          <div className="">
            {/* Category */}
            <div className="py-1">
              <p className="font-bold">Category:</p>
              <p className="text-sm text-gray-500">{category.name}</p>
            </div>
            {/* Price */}
            <div className="py-1">
              <p className="font-bold">Price:</p>
              <p className="text-sm text-gray-500">${product.price}</p>
            </div>
            {/* Sku */}
            <div className="py-1">
              <p className="font-bold">Stock:</p>
              <p className="text-sm text-gray-500">{product.stock}</p>
            </div>
            {/* Sku */}
            <div className="py-1">
              <p className="font-bold">Identifier:</p>
              <p className="text-sm text-gray-500">{product.sku}</p>
            </div>
            {/* Description */}
            <div className="py-1">
              <p className="font-bold">Description:</p>
              <p>{product.description}</p>
            </div>
            {/* Variants */}
            <div className="py-1">
              <div className="font-bold flex justify-between">
                <span>Variants:</span> <ProductVariantModal productId={id} />
              </div>
              <p>
                {product.variants != 0
                  ? product.variants.map(
                      (variant: any) => variant.variantOption + ", "
                    )
                  : "--Nil--"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;
