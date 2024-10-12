"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import Spinner from "../reusable/Spinner";
import ImageUploadModal from "@/components/ImageUploadModal";
import ImageStore, { url } from "@/store/store";
import { getCategories } from "@/lib/data";
import mongoose from "mongoose";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface ProductForm {
  name: string;
  price: number;
  description: string;
  category: mongoose.Types.ObjectId;
  stock: number;
  images: url[];
}

const NewProductForm = ({ setOpen }: Props) => {
  const [categories, setCategories] = useState<Object[]>();
  const [errors, setErrors] = useState<Object[]>();
  const [singleError, setSingleError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<ProductForm>({
    defaultValues: {
      images: [],
    },
  });
  const router = useRouter();

  //   const handleSubmit = async (formData: FormData) => {
  //     const res = await createProduct(formData);
  //     setMessage(res.message);
  //   };

  const getCategoriesObject = async () => {
    const categories = await getCategories();
    setCategories(categories);
  };

  const images = useStore(ImageStore, (state) => state.images);
  const removeAllImages = useStore(
    ImageStore,
    (state) => state.removeAllImages
  );

  return (
    <div className=" mt-10">
      <h2 className="text-3xl font-bold text-center py-2">
        Add a Product Listing
      </h2>
      <form
        className="w-full flex flex-col gap-3 text-indigo-700 font-semibold"
        onSubmit={handleSubmit(async (data) => {
          // console.log(data);
          setLoading(true);
          try {
            const res = await axios.post("/api/products", data);
            if (res.status === 201) {
              setSuccess(true);
            } else {
              const newErrors = errors
                ? [...errors, "Something went wrong, please try again!"]
                : errors;
              setErrors(newErrors);
            }
            setLoading(false);
            reset();
            removeAllImages();
            setOpen(false);
            router.refresh();
          } catch (ex: any) {
            let newErrors: object[] = [];
            try {
              if (ex.response.status === 500) {
                setSingleError(ex.response.data);
              } else {
                ex.response.data.map((res: any) => {
                  // console.log(res);
                  newErrors.push(res);
                });
                setErrors(newErrors);
              }
            } catch (e) {
              setErrors([ex.response.data]);
            }
            setLoading(false);
          }
        })}
      >
        {errors &&
          errors.map((error: any, i) => (
            <p className="text-red-500 font-semibold text-center" key={i}>
              {error.message}
            </p>
          ))}
        {singleError && (
          <p className="text-red-500 font-semibold text-center">
            {singleError}
          </p>
        )}
        {success && <p className="text-green-500 font-semibold">{success}</p>}
        <div className="rounded">
          <label className="flex flex-col text-xl gap-2">
            Name:
            <input
              type="text"
              {...register("name")}
              placeholder="Apple Watch"
              className="p-3 bg-slate-100 rounded-lg focus:outline-none border text-base font-extralight border-slate-300"
            />
          </label>
        </div>
        <div className="rounded">
          <label className="flex flex-col text-xl gap-2">
            Description:
            <textarea
              rows={5}
              {...register("description")}
              placeholder="Apple Watch Description"
              className="p-3 bg-slate-100 rounded-lg focus:outline-none border text-base font-extralight border-slate-300 "
            />
          </label>
        </div>
        <div className="rounded flex gap-2">
          <label className="flex w-6/12 flex-col text-xl gap-2">
            Price:
            <div className="flex p-3 bg-slate-100 rounded-lg border text-base font-extralight border-slate-300">
              <span className="px-2">$</span>
              <input
                type="number"
                {...register("price", { min: 1, valueAsNumber: true })}
                placeholder="89.25"
                className=" focus:outline-none bg-slate-100 w-full"
              />
            </div>
          </label>
          <label className="flex w-6/12 flex-col text-xl gap-2">
            <p className="flex flex-col md:flex-row items-center gap-2">
              Stock:
              <span className="text-xs text-red-500">
                <em>Total stock if there are variants</em>
              </span>
            </p>
            <input
              type="number"
              placeholder="26"
              {...register("stock", { min: 1, valueAsNumber: true })}
              className="p-3 bg-slate-100 rounded-lg focus:outline-none border text-base font-extralight border-slate-300"
            />
          </label>
        </div>
        <div className="rounded">
          <label className="flex flex-col text-xl gap-2">
            Category:
            <select
              onMouseOver={getCategoriesObject}
              {...register("category")}
              className="text-base font-extralight p-3 focus:outline-none border bg-slate-100 border-slate-300 rounded-lg"
            >
              <option>---</option>
              {categories?.map((category: any) => (
                <option
                  value={category._id.toString()}
                  key={category._id.toString()}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <h4 className="text-xl">Images:</h4>
        {images.map((image, i) => (
          <div className="" key={i}>
            <input
              type="hidden"
              value={image._id.toString()}
              {...register(`images.${i}._id` as const)}
            />
            <input
              type="hidden"
              value={image.imageUrl}
              {...register(`images.${i}.imageUrl` as const)}
            />
          </div>
        ))}
        <div className="w-full md:w-6/12">
          <div className="flex gap-2 my-4">
            {images &&
              images.map((image) => (
                <Image
                  src={image.imageUrl}
                  alt=""
                  width="100"
                  height="100"
                  key={image.imageUrl}
                  className="rounded-lg w-28 h-28 object-cover"
                />
              ))}
          </div>
          <ImageUploadModal />
        </div>
        <div className="flex justify-between gap-3 mt-10">
          <span
            className="flex items-center gap-1 text-slate-100 rounded-md px-5 py-2 max-h-max transition ease-in-out bg-red-600"
            onClick={() => setOpen(false)}
          >
            Close
          </span>
          <button
            type="submit"
            className="flex items-center gap-1 text-slate-100 rounded-md px-5 py-2 max-h-max transition ease-in-out bg-green-600"
          >
            Save{loading && <Spinner />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProductForm;
