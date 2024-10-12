"use client";
import { useState } from "react";
import DeleteModal from "../reusable/DeleteModal";
import { useFormStatus } from "react-dom";
import { deleteUser } from "@/lib/actions";

interface Props {
  userId: string;
  name: string;
}

const DeleteUser = ({ userId, name }: Props) => {
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
        action={deleteUser}
        modalOpen={open}
        setModalOpen={setOpen}
        loading={pending}
        value={userId}
        name={name}
      />
    </>
  );
};

export default DeleteUser;
