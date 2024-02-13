"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Modal from "@components/Modal";
import NewStudent from "@components/NewStudent";
import StudentIdCard from "../components/StudentIdCard";
import { FaBookDead, FaGithub } from "react-icons/fa";
import { SiW3C } from "react-icons/si";

type Wallet = {
  address: string;
};

const Content = () => {
  const [wallet, setWallet] = useState<Wallet | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { primaryWallet } = useDynamicContext();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setWallet(primaryWallet);
  }, [primaryWallet]);

  const openSignup = () => {
    setIsModalOpen(true);
  };

  const submitForm = async () => {
    if (formRef.current && wallet?.address) {
      console.log("create student id");

      const formData = new FormData(formRef.current);

      const data = {
        type: "studentId",
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        secret: formData.get("secret"),
        recipient: `polygon:${wallet?.address}`,
      };

      console.log("test", data);

      const studentIdCred = await issueCredential(data);

      if (studentIdCred.credentialId) {
        setIsModalOpen(false);
      }
      console.log("studentIdCred:", studentIdCred);
    }
  };

  const issueCredential = async (credential: any) => {
    const response = await fetch("/api/issue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    const data = await response.json();

    return data;
  };

  const retrieveCredentials = async () => {
    const response = await fetch("/api/retrieve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wallet: wallet?.address,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const verifyCredential = async () => {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wallet: wallet?.address,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mt-8 mb-4">
          Welcome to Shibetoshi University
        </h1>
        <p className="text-lg mb-8">
          Your journey to learning and growth starts here.
        </p>

        <div className="bg-blue-100 p-6 rounded-lg mb-8 relative flex">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Get Started</h2>
            <p className="mb-4 max-w-xl">
              To get started with the demo you need to create your Shibetoshi
              University Student ID. This is a verifiable credential that
              represents your identity in the university.
            </p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white text--2xl font-bold py-4 px-6 rounded"
              onClick={() => openSignup()}
            >
              Create Student ID
            </button>
          </div>
          <div className="ml-6">
            <StudentIdCard />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-8">Ready to build?</h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-100 p-6 rounded-lg relative">
            <h3 className="font-bold mb-2">Docs</h3>
            <FaBookDead
              title="Docs link"
              className="absolute top-7 right-7 text-2xl"
            />
            <a
              href="https://docs.crossmint.com/verifiable-credentials/quickstart"
              target="_blank"
              className="text-blue-500"
            >
              Check out the Docs
            </a>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg relative">
            <h3 className="font-bold mb-2">GitHub Repo</h3>
            <FaGithub
              title="Github link"
              className="absolute top-7 right-7 text-2xl"
            />
            <a
              href="https://github.com/Crossmint/verifiable-credentials-demo"
              target="_blank"
              className="text-blue-500"
            >
              Go to GitHub Repo
            </a>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg relative">
            <h3 className="font-bold mb-2">W3C Standard</h3>
            <SiW3C
              title="W3C link"
              className="absolute top-7 right-7 text-2xl"
            />
            <a
              href="https://www.w3.org/TR/vc-data-model-2.0/"
              target="_blank"
              className="text-blue-500"
            >
              Learn about the W3C Verifiable Credentials Standard
            </a>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        submit={submitForm}
      >
        <form ref={formRef}>
          <NewStudent />
        </form>
      </Modal>
    </>
  );
};

export default Content;
