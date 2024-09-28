"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCategoryAlt } from "react-icons/bi";
import {
  FaBagShopping,
  FaGear,
  FaHouseChimney,
  FaUsers,
} from "react-icons/fa6";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const links = [
  { id: 1, path: "/admin", label: "Home", icon: <FaHouseChimney size="20" /> },
  {
    id: 2,
    path: "/admin/products",
    label: "Products",
    icon: <FaBagShopping size="20" />,
  },
  {
    id: 3,
    path: "/admin/categories",
    label: "Categories",
    icon: <BiCategoryAlt size="20" />,
  },
  { id: 4, path: "/admin/users", label: "Users", icon: <FaUsers size="20" /> },
  {
    id: 5,
    path: "/admin/orders",
    label: "Orders",
    icon: <MdOutlineShoppingCartCheckout size="20" />,
  },
];

const AdminNavMenu = () => {
  const pathname = usePathname();

  return (
    <div className="text-sm text-center sm:text-start">
      <div className="mt-4">
        <h2 className="sm:text-sm text-xs p-1 sm:p-3 border-b border-gray-600">
          ADMIN
        </h2>
        <ul className="mt-3">
          {links.map((link) => (
            <Link href={link.path} key={link.id}>
              <li
                className={`p-3 hover:bg-gray-900 flex items-center justify-center sm:justify-start gap-2 ${
                  pathname == link.path && "bg-gray-900"
                }`}
              >
                {link.icon} <span className="hidden sm:flex">{link.label}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="sm:text-sm text-xs p-1 sm:p-3 border-b border-gray-600">
          OPTIONS
        </h2>
        <ul className="mt-3">
          <Link href="/admin/settings">
            <li
              className={`p-3 hover:bg-gray-900 flex items-center justify-center sm:justify-start gap-2 ${
                pathname == "/admin/settings" && "bg-gray-900"
              }`}
            >
              <FaGear size="20" />{" "}
              <span className="hidden sm:flex">Settings</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavMenu;
