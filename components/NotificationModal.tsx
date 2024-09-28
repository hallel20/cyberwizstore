"use client";
import { FaBell } from "react-icons/fa6";
import Badge from "./reusable/Badge";
import { useState } from "react";
import Modal from "./reusable/Modal";

const NotificationModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [count, setCount] = useState(3);

  return (
    <>
      <div
        onClick={() => {
          setModalOpen((prev) => !prev);
          //Call the Server and Mark all Notiications as Read
          //Logic for calling the server goes here
          setCount(0);
        }}
      >
        <Badge count={count} className="cursor-pointer">
          <FaBell size="25" />
        </Badge>
      </div>
      {modalOpen && (
        <Modal>
          <div className="flex flex-col gap-1">
            <h4 className="text-xl font-semibold">New Message</h4>
            <p className="text-sm text-justify">
              Hello Admin, This is a simple message to tell you that you are new
              to this website
            </p>
            <hr className="border-gray-100 py-1 mt-2" />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-xl font-semibold">New Message</h4>
            <p className="text-sm text-justify">
              Hello Admin, This is a simple message to tell you that you are new
              to this website
            </p>
            <hr className="border-gray-100 py-1 mt-2" />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-xl font-semibold">New Message</h4>
            <p className="text-sm text-justify">
              Hello Admin, This is a simple message to tell you that you are new
              to this website
            </p>
            <hr className="border-gray-100 py-1 mt-2" />
          </div>
        </Modal>
      )}
    </>
  );
};

export default NotificationModal;
