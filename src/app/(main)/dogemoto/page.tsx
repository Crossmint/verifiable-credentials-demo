"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Link from "next/link";
import Modal from "@components/Modal";
import Overlay from "@components/Overlay";
import NewStudent from "@components/NewStudent";
import { FaCheckCircle } from "react-icons/fa";

type Wallet = {
  address: string;
};

const Content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { primaryWallet: wallet } = useDynamicContext();

  const verifyCredenial = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mt-8 mb-4">
          Welcome to Dogemoto University
        </h1>
        <p className="text-lg mb-5">
          Verify your courses from other Universities here.
        </p>
        <p className="text-md mb-8 font-light">
          This page exists to demonstrate the functionality of third party
          verification of your credentials. Imagine that you've navigated to a
          different university website when using this page.
        </p>

        <div className="flex items-center bg-green-200 text-green-700 px-3 py-2 my-4 rounded">
          <FaCheckCircle className="mr-2" />
          <span>
            Under the hood this page is using an API key under a completely
            different project than Shibetoshi University
          </span>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-8 relative flex">
          <div className="flex-1"></div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        submit={undefined}
      >
        modal content
      </Modal>

      <Overlay start={isProcessing} message="Processing..." />
    </>
  );
};

export default Content;
