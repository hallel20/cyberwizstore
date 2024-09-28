import ImagesStore from "@/store/store";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useStore } from "zustand";

const ImageUploadModal = () => {
  const [urls, setUrls] = useState([""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const setImages = useStore(ImagesStore, (state) => state.setImages);

  const handleSave = () => {
    // console.log("I am Saving");
    setImages(urls);
    setModalOpen(false);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let image = new FormData();
    const files = e.currentTarget.files!;
    const file = files[0];
    image.append("image", file);
    try {
      setLoading(true);
      const res: any = await axios.post("/api/uploads", image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //   console.log(res);
      if (res.status === 200) {
        const newUrls = [...urls, res.data];
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
  //   console.log(urls);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-1 ring-slate-500 text-slate-500 ring rounded-md px-2 py-2 max-h-max transition ease-in-out bg-white hover:bg-slate-500 hover:text-white"
      >
        Upload Image
      </button>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 z-20 w-full justify-center items-center ease-in-out 1s"
        style={{
          backgroundColor: "#00000095",
          display: modalOpen ? "flex" : "none",
        }}
      >
        <div className="w-10/12 md:w-6/12 min-h-96 bg-white p-5 rounded-lg relative flex flex-col justify-between">
          <button
            className="absolute top-4 right-4 p-2 text-black bg-slate-100 rounded-md text-3xl font-bold"
            onClick={() => setModalOpen(false)}
          >
            <IoMdClose />
          </button>
          <form>
            <h1 className="text-2xl font-semibold mb-6">Upload an Image</h1>
            <div className="flex items-end gap-2">
              {urls.length > 0 &&
                urls.map(
                  (image) =>
                    image !== "" && (
                      <div
                        className="h-40 w-40 rounded-lg overflow-hidden"
                        key={image}
                      >
                        <Image
                          src={image}
                          width="100"
                          height="100"
                          alt=""
                          className="object-cover h-40 w-40 object-center"
                        />
                      </div>
                    )
                )}
              <label className="p-4 rounded-md bg-slate-500 text-3xl flex max-h-max text-white">
                <FaCamera size="55" />
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
            {loading && <p>Uploading Image...</p>}
            {error !== "" && (
              <p className="p-2 text-red-600 text-center">{error}</p>
            )}
          </form>
          <div className="flex justify-end gap-3 mt-10">
            <button
              className="flex items-center gap-1 text-slate-100 rounded-md px-2 py-2 max-h-max transition ease-in-out bg-red-600"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
            <button
              className="flex items-center gap-1 text-slate-100 rounded-md px-2 py-2 max-h-max transition ease-in-out bg-green-600"
              onClick={handleSave}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploadModal;
