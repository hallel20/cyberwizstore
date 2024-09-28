"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Modal from "./reusable/Modal";

const AccountModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="">
      <FaUserCircle
        size="25"
        className="cursor-pointer"
        onClick={() => setModalOpen((prev) => !prev)}
      />
      {modalOpen && (
        <Modal>
          <ul className="text-center">
            <Link href="/profile">
              <li>Profile</li>
            </Link>
            <Link href="/login">
              <li>Login</li>
            </Link>
            <Link href="/register">
              <li>Register</li>
            </Link>
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default AccountModal;
