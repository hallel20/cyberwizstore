import { FaSearch } from "react-icons/fa";
import AccountModal from "./AccountModal";
import NotificationModal from "./NotificationModal";

const AdminTopBar = () => {
  return (
    <div className="flex justify-between p-3 items-center text-gray-700 bg-gray-100">
      <div className=""></div>
      <div className="flex gap-3">
        {/* User and Notification */}
        <NotificationModal />
        <AccountModal />
      </div>
    </div>
  );
};

export default AdminTopBar;
