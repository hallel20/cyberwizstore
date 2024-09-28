import Image from "next/image";
import { products } from "./data";
import { MdAddCircle } from "react-icons/md";
import Link from "next/link";

const Products = () => {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-3xl font-semibold py-4">Products</h2>
        <Link href="/admin/products/add">
          <button className="flex items-center gap-1 ring-slate-500 text-slate-500 ring rounded-md px-2 py-2 max-h-max transition ease-in-out bg-white hover:bg-slate-500 hover:text-white">
            Add New <MdAddCircle />
          </button>
        </Link>
      </div>
      <table className="flex flex-col">
        <thead>
          <tr className="flex w-100 bg-slate-500 font-semibold text-white sm:text-base">
            <td className="py-3 md:w-5/12 w-8/12">Product</td>
            <td className="py-3 md:w-1/12 w-4/12">Price</td>
            <td className="py-3 w-1/12 hidden md:block">Stock</td>
            <td className="py-3 w-2/12 hidden md:block">Category</td>
            <td className="py-3 w-2/12 hidden md:block">Variants</td>
            <td className="py-3 w-1/12 hidden md:block">Orders</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr className="flex w-100 sm:text-base" key={product.id}>
              <td className="md:w-5/12 w-8/12 flex items-center">
                <Image
                  src={product.image}
                  width="50"
                  height="50"
                  alt="Apple Watch"
                />
                {product.name}
              </td>
              <td className="md:w-1/12 w-4/12 flex items-center">
                ${product.price}
              </td>
              <td className="w-1/12 hidden md:flex items-center">
                {product.stock}
              </td>
              <td className="w-2/12 hidden md:flex items-center">
                {product.category}
              </td>
              <td className="w-2/12 hidden md:flex items-center">
                {product.variants?.join(", ")}
              </td>
              <td className="w-1/12 hidden md:flex items-center">
                {product.orders}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
