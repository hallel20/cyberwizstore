import Image from "next/image";

const RecentOrders = () => {
  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-semibold pb-2 mb-3 border-b border-gray-200">
        Recent Orders
      </h3>
      <div className="flex gap-1 items-center border-b border-gray-100">
        <div className="w-24">
          <Image
            src="/img/product-6.jpg"
            alt="product"
            width="70"
            height="70"
            className="object-cover h-24 w-24"
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-2 justify-between">
            <h5 className="text-md font-semibold">Iphone 16 pro Max</h5>
            <span className="bg-indigo-800 px-2 rounded-full text-white font-bold">
              2
            </span>
          </div>
          <p className="flex gap-2 justify-between text-xs">
            <span className="text-gray-500 font-semibold">Hallel Ojowuro</span>
            <span className="text-gray-400">12/09/2024</span>
          </p>
        </div>
      </div>
      <div className="flex gap-1 items-center border-b border-gray-100">
        <div className="w-24">
          <Image
            src="/img/product-7.jpg"
            alt="product"
            width="70"
            height="70"
            className="object-cover h-24 w-24"
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-2 justify-between">
            <h5 className="text-md font-semibold">Women Fashion Top xxl</h5>
            <span className="bg-indigo-800 px-2 rounded-full text-white font-bold">
              1
            </span>
          </div>
          <p className="flex gap-2 justify-between text-xs">
            <span className="text-gray-500 font-semibold">
              Mhiz Jane Jasmine
            </span>
            <span className="text-gray-400">08/09/2024</span>
          </p>
        </div>
      </div>
      <div className="flex gap-1 items-center border-b border-gray-100">
        <div className="w-24">
          <Image
            src="/img/product-2.jpg"
            alt="product"
            width="70"
            height="70"
            className="object-cover h-24 w-24"
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="flex gap-2 justify-between">
            <h5 className="text-md font-semibold">Unisex top 3xl</h5>
            <span className="bg-indigo-800 px-2 rounded-full text-white font-bold">
              3
            </span>
          </div>
          <p className="flex gap-2 justify-between text-xs">
            <span className="text-gray-500 font-semibold">Psalm Ojowuro</span>
            <span className="text-gray-400">28/08/2024</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
