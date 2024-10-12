"use client";
import ImagesStore, { url } from "@/store/store";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useStore } from "zustand";
import Spinner from "./reusable/Spinner";
import { MdClose } from "react-icons/md";

const ImageUploadModal = () => {
  const [urls, setUrls] = useState<url[]>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const setImages = useStore(ImagesStore, (state) => state.setImages);
  const removeAllImages = useStore(
    ImagesStore,
    (state) => state.removeAllImages
  );

  const handleSave = () => {
    // console.log("I am Saving");
    urls ? setImages(urls) : null;
    setModalOpen(false);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let image = new FormData();
    const files = e.currentTarget.files!;
    image.append("image", files[0]);
    // for (var i = 0; i < files.length; i++) {
    //   var file = files[i];
    //   image.delete("image");
    //   // console.log(image.getAll("image"));
    // }
    try {
      setLoading(true);
      const res: any = await axios.post("/api/uploads", image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //   console.log(res);
      if (res.status === 200) {
        const url = res.data;
        // console.log(res.data);
        const newUrls = urls ? [...urls, url] : [url];
        setUrls(newUrls);
      } else if (res.status === 400) {
        setError(res.data.error);
      } else {
        setError("Something went wrong, Please try again!");
      }
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 4000);
    } catch (ex) {
      setError("Something went wrong, Please try again!");
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  const handleRemove = async (image: url) => {
    const newUrls = urls && urls.filter((url) => image != url);
    try {
      setUrls(newUrls);
      await axios.post("/api/uploads/delete", image);
    } catch (ex) {
      setUrls(urls);
      console.log(ex);
    }
  };
  //   console.log(urls);

  return (
    <>
      <span
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-1 cursor-pointer ring-slate-500 text-slate-500 ring rounded-md px-2 py-2 max-w-max transition ease-in-out bg-white hover:bg-slate-500 hover:text-white"
      >
        Upload Image
      </span>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 z-20 w-full justify-center items-center ease-in-out 1s"
        style={{
          backgroundColor: "#00000095",
          display: modalOpen ? "flex" : "none",
        }}
      >
        <div className="w-10/12 md:w-6/12 min-h-96 bg-white p-5 rounded-lg relative flex flex-col justify-between">
          <span
            className="absolute cursor-pointer top-4 right-4 p-2 text-black bg-slate-100 rounded-md text-3xl font-bold"
            onClick={() => setModalOpen(false)}
          >
            <IoMdClose />
          </span>
          <h1 className="text-2xl font-semibold mb-6">Upload an Image</h1>
          <div className="flex items-end gap-2">
            {urls &&
              urls.length > 0 &&
              urls.map((image) => (
                <div className="h-40 w-40 relative" key={image.imageUrl}>
                  <div
                    onClick={() => handleRemove(image)}
                    className="absolute cursor-pointer -top-1 -right-1 text-xs rounded-full flex items-center justify-center p-1 bg-slate-300 text-slate-950"
                  >
                    <MdClose size="20" />
                  </div>
                  <Image
                    src={image.imageUrl}
                    width="100"
                    height="100"
                    alt=""
                    className="object-cover rounded-lg h-40 w-40 object-center"
                  />
                </div>
              ))}
            <label className="p-4 rounded-md cursor-pointer bg-slate-500 text-3xl flex max-h-max text-white">
              <FaCamera size="55" />
              <input
                type="file"
                name=""
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {loading && (
              <p>
                Uploading Image <Spinner />
              </p>
            )}
          </div>

          {error !== "" && (
            <p className="p-2 text-red-600 text-center">{error}</p>
          )}
          <div className="flex justify-between gap-3 mt-10">
            <span
              className="flex cursor-pointer items-center gap-1 text-slate-100 rounded-md px-5 py-2 max-h-max transition ease-in-out bg-red-600"
              onClick={() => {
                setModalOpen(false);
                setUrls([]);
                removeAllImages();
              }}
            >
              Cancel
            </span>
            <span
              className="flex items-center cursor-pointer gap-1 text-slate-100 rounded-md px-5 py-2 max-h-max transition ease-in-out bg-green-600"
              onClick={handleSave}
            >
              Done
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploadModal;
