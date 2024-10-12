import AdminNavMenu from "@/components/AdminNavMenu";
import AdminTopBar from "@/components/AdminTopBar";
import localFont from "next/font/local";
import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa6";
import { SiCarthrottle } from "react-icons/si";
import "../globals.css";
import AdminFooter from "@/components/AdminFooter";

export const metadata = {
  title: "Admin Page For CyberwizStore",
  description: "Admin Panel, Next.JS, ReactJS, Node.JS",
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-700`}
      >
        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/6 bg-slate-800 text-gray-300 min-h-screen flex flex-col justify-between fixed">
            <div>
              <div className="flex align-middle justify-center pt-7">
                <SiCarthrottle size="40" />
              </div>

              <AdminNavMenu />
            </div>
            {/* sidebar footer */}
            <Link
              href="/"
              className="p-3 hover:bg-gray-900 flex align-middle justify-center sm:justify-start gap-2 font-bold text-sm"
            >
              <FaEye size="18" />
              <span className="hidden sm:flex">Visit Shop</span>
            </Link>
          </div>
          {/* Sidebar End */}
          <div className="w-1/6"></div>
          <div className="w-5/6">
            <AdminTopBar />
            {children}
            <AdminFooter />
          </div>
        </div>
      </body>
    </html>
  );
};

export default AdminLayout;
