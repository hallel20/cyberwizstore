"use client";
import { useState } from "react";
import ProductVariantForm from "./ProductVariantForm";
// import dynamic from "next/dynamic";

// const ProductVariantForm = dynamic(
//   import("@/components/products/ProductVariantForm")
// );

const ProductVariantModal = ({ productId }: { productId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-sky-400 text-white px-3 py-1 rounded-md me-2"
      >
        Add Variant
      </button>
      <ProductVariantForm
        open={open}
        setOpen={setOpen}
        productId={productId}
      ></ProductVariantForm>
    </>
  );
};

export default ProductVariantModal;
