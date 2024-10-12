"use client";
import { Suspense, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import dynamic from "next/dynamic";
import { IoMdClose } from "react-icons/io";
import Spinner from "../reusable/Spinner";

const NewProductForm = dynamic(
  () => import("@/components/products/NewProductForm"),
  {
    ssr: false,
  }
);

const NewProductModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 ring-slate-500 text-slate-500 ring rounded-md px-2 py-2 max-h-max transition ease-in-out bg-white hover:bg-slate-500 hover:text-white"
      >
        Add New <MdAddCircle />
      </button>
      <div
        className="fixed top-0 left-0 right-0 max-h-screen overflow-y-scroll bottom-0 z-20 w-full justify-center items-center ease-in-out 1s"
        style={{
          backgroundColor: "#00000095",
          display: open ? "flex" : "none",
        }}
      >
        <div className="w-10/12 p-5 md:w-8/12 min-h-96 bg-white rounded-lg relative flex flex-col justify-between">
          <button
            className="absolute top-7 right-4 p-2 text-black bg-slate-100 rounded-md text-3xl font-bold"
            onClick={() => setOpen(false)}
          >
            <IoMdClose />
          </button>
          <div className="max-h-screen overflow-y-scroll scroll-p-0">
            <Suspense fallback={<Spinner />}>
              <NewProductForm setOpen={setOpen} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProductModal;
