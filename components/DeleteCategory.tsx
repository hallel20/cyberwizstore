"use client";
import { useState } from "react";
import DeleteModal from "./reusable/DeleteModal";
import { deleteCategory } from "@/lib/actions";
import { useFormStatus } from "react-dom";

const DeleteCategory = ({
  category,
  name,
}: {
  category: string;
  name: string;
}) => {
  const [open, setOpen] = useState(false);
  const { pending } = useFormStatus();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-slate-100 rounded-md px-5 py-2 max-h-max transition ease-in-out bg-red-600"
      >
        Delete
      </button>
      <DeleteModal
        action={deleteCategory}
        modalOpen={open}
        setModalOpen={setOpen}
        loading={pending}
        value={category}
        name={name}
      />
    </>
  );
};

export default DeleteCategory;
