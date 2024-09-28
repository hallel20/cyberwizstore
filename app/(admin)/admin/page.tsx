import RecentOrders from "@/components/RecentOrders";
import PopularProducts from "@/components/PopularOrders";
import MyChart from "./MyChart";

const Admin = () => {
  return (
    <div className="block md:flex">
      <div className="md:w-2/3 p-2 md:p-8">
        <h3 className="text-2xl font-bold mb-8">Order Summary</h3>
        <MyChart />
      </div>
      <div className="md:w-1/3 py-8 px-3 flex flex-col gap-20">
        <RecentOrders />
        <PopularProducts />
      </div>
    </div>
  );
};

export default Admin;
