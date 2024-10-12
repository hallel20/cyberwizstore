import Image from "next/image";
import NewProductModal from "@/components/products/NewProductModal";
import DeleteProduct from "@/components/products/DeleteProduct";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/data";

const Products = async () => {
  const products = await getProducts();
  const categories = await getCategories();
  const getCategory = (categoryId: any) => {
    const category = categories!.filter(
      (category) => category._id.toString() === categoryId
    );
    return category[0].name;
  };
  return (
    <div className="px-4">
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-3xl font-semibold py-4">Products</h2>
        <NewProductModal />
      </div>
      <table className="flex flex-col">
        <thead>
          <tr className="flex w-100 bg-slate-500 font-semibold text-white sm:text-base">
            <td className="py-3 md:w-5/12 w-8/12">Product</td>
            <td className="py-3 md:w-1/12 w-4/12">Price</td>
            <td className="py-3 w-1/12 hidden md:block">Stock</td>
            <td className="py-3 w-2/12 hidden md:block">Category</td>
            <td className="py-3 w-3/12 hidden md:block">Actions</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr className="flex w-100 sm:text-base" key={product.id}>
              <td className="md:w-5/12 w-8/12">
                <Link
                  href={`/admin/products/${product._id.toString()}`}
                  className="flex items-center"
                >
                  <Image
                    src={product.images[0].imageUrl}
                    width="50"
                    height="50"
                    alt="Apple Watch"
                  />
                  {product.name}
                </Link>
              </td>
              <td className="md:w-1/12 w-4/12 flex items-center">
                ${product.price}
              </td>
              <td className="w-1/12 hidden md:flex items-center">
                {product.stock}
              </td>
              <td className="w-2/12 hidden md:flex items-center">
                {getCategory(product.category.toString())}
              </td>
              <td className="w-3/12 hidden md:flex items-center justify-between">
                <Link href={`/admin/products/${product._id.toString()}`}>
                  <button className="bg-sky-500 rounded-md px-3 py-1 text-white text-xs">
                    View
                  </button>
                </Link>
                <DeleteProduct
                  productId={product._id.toString()}
                  name={product.name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
