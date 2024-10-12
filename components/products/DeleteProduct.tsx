"use client";
import { useState } from "react";
import DeleteModal from "../reusable/DeleteModal";
import { useFormStatus } from "react-dom";
import { deleteProduct } from "@/lib/actions";

interface Props {
  productId: string;
  name: string;
}

const DeleteProduct = ({ productId, name }: Props) => {
  const [open, setOpen] = useState(false);
  const { pending } = useFormStatus();
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-slate-100 rounded-md px-3 py-1 text-xs max-h-max transition ease-in-out bg-red-600"
      >
        Delete
      </button>
      <DeleteModal
        action={deleteProduct}
        modalOpen={open}
        setModalOpen={setOpen}
        loading={pending}
        value={productId}
        name={name}
      />
    </>
  );
};

export default DeleteProduct;
