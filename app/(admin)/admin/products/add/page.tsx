"use client";
import ImageUploadModal from "@/components/ImageUploadModal";
import useImageStore from "@/store/store";
import Image from "next/image";
import { useStore } from "zustand";

const NewProductPage = () => {
  let images = useStore(useImageStore, (state) => state.images);
  images = images.filter((image) => image !== "");
  return (
    <div className="p-5 flex flex-col justify-center min-h-screen min-w-full items-center">
      <form action="">
        <div className="rounded">
          <label>
            <input type="text" name="name" placeholder="Apple Watch" />
          </label>
        </div>
        <div className="">
          <div className="flex gap-2 mb-4">
            {images &&
              images.map((image) => (
                <Image
                  src={image}
                  alt=""
                  width="100"
                  height="100"
                  key={image}
                  className="rounded-lg w-28 h-28 object-cover"
                />
              ))}
          </div>
          <ImageUploadModal />;
        </div>
      </form>
    </div>
  );
};

export default NewProductPage;
