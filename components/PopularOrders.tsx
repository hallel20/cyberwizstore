import Image from "next/image";

const PopularProducts = () => {
  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-semibold pb-2 mb-3 border-b border-gray-200">
        Popular Products
      </h3>
      <div className="flex gap-1 items-center border-b border-gray-100">
        <div className="w-16 h-16">
          <Image
            src="/img/product-6.jpg"
            alt="product"
            width="70"
            height="70"
            className="object-cover h-16 w-16"
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-2 justify-between">
            <h5 className="text-md font-semibold">Iphone 16 pro Max</h5>
            <span className="bg-indigo-800 px-2 rounded-full text-white font-bold">
              25
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-1 items-center border-b border-gray-100">
        <div className="w-16 h-16">
          <Image
            src="/img/product-7.jpg"
            alt="product"
            width="70"
            height="70"
            className="object-cover h-16 w-16"
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-2 justify-between">
            <h5 className="text-md font-semibold">Women Fashion Top xxl</h5>
            <span className="bg-indigo-800 px-2 rounded-full text-white font-bold">
              20
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-1 items-center border-b border-gray-100">
        <div className="w-16 h-16">
          <Image
            src="/img/product-2.jpg"
            alt="product"
            width="70"
            height="70"
            className="object-cover h-16 w-16"
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-2 justify-between">
            <h5 className="text-md font-semibold">Unisex top 3xl</h5>
            <span className="bg-indigo-800 px-2 rounded-full text-white font-bold">
              19
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;
