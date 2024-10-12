"use client";
import axios from "axios";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdAddCircle } from "react-icons/md";
import Spinner from "./reusable/Spinner";
import { redirect, useRouter } from "next/navigation";
import OverlayModal from "./reusable/OverlayModal";

const NewCategoryModal = () => {
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const handleSave = async () => {
    // Logic for saving Category
    try {
      setLoading(true);
      const res = await axios.post("/api/categories", { name: category, slug });
      if (res.status == 201) {
        setModalOpen(false);
        setLoading(false);
        setCategory("");
        setSlug("");
      }
    } catch (ex: any) {
      console.log(ex.response);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };
  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-1 ring-slate-500 text-slate-500 ring rounded-md px-2 py-2 max-h-max transition ease-in-out bg-white hover:bg-slate-500 hover:text-white"
      >
        Add New <MdAddCircle />
      </button>
      <OverlayModal open={modalOpen} setOpen={setModalOpen}>
        <form className="flex flex-col gap-3 text-indigo-700 font-semibold justify-center">
          <h1 className="text-3xl text-center font-bold ms-4">
            Add a Category
          </h1>
          <div className="rounded">
            <label className="flex flex-col text-xl gap-2">
              Name:
              <input
                type="text"
                required
                name="name"
                placeholder="Fashion"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-3 bg-slate-100 rounded-lg focus:outline-none border text-base font-extralight border-slate-300"
              />
            </label>
          </div>
          <div className="rounded">
            <label className="flex flex-col text-xl gap-2">
              <div>
                Slug: &nbsp; <span className="text-xs">Unique</span>
              </div>
              <input
                type="text"
                name="slug"
                placeholder="fashion-1"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="p-3 bg-slate-100 rounded-lg focus:outline-none border text-base font-extralight border-slate-300"
              />
            </label>
          </div>
        </form>
        <div className="flex justify-between gap-3 mt-10">
          <button
            className="flex items-center gap-1 text-slate-100 rounded-md px-5 py-2 max-h-max transition ease-in-out bg-red-600"
            onClick={() => setModalOpen(false)}
          >
            Close
          </button>
          <button
            className="flex items-center gap-1 text-slate-100 rounded-md px-5 py-2 max-h-max transition ease-in-out bg-green-600"
            onClick={handleSave}
          >
            Confirm{loading && <Spinner />}
          </button>
        </div>
      </OverlayModal>
    </>
  );
};

export default NewCategoryModal;
