"use client";

import React, { useState, useRef } from "react";
import { useCredentials } from "@context/credentials";
import Link from "next/link";
import Modal from "@components/Modal";
import Overlay from "@components/Overlay";
import NewStudent from "@components/NewStudent";
import StudentIdCard from "../components/StudentIdCard";
import { FaBookDead, FaGithub } from "react-icons/fa";
import { SiW3C } from "react-icons/si";
import Credential from "@components/Credential";

const Content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const credentialContext = useCredentials();
  const formRef = useRef<HTMLFormElement>(null);
  const walletAddress = credentialContext?.wallet?.address;

  const openSignup = () => {
    setIsModalOpen(true);
  };

  const refreshCredentials = async () => {
    setIsProcessing(true);
    await credentialContext?.refreshCredentials(walletAddress);
    setIsProcessing(false);
  };

  

  const submitForm = async () => {
    if (formRef.current && walletAddress) {
      setIsProcessing(true);

      const formData = new FormData(formRef.current);

      const data = {
        type: "studentId",
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        secret: formData.get("secret"),
        recipient: `polygon-amoy:${walletAddress}`,
      };

      const studentIdCred = await issueCredential(data);

      if (studentIdCred.credentialId) {
        setIsModalOpen(false);
        setIsProcessing(false);
        credentialContext?.setPendingStudentId();
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

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mt-8 mb-4">
          Welcome to Shibetoshi University
        </h1>
        <p className="text-lg mb-8">
          Your journey to learning and growth starts here.
        </p>

        <div className="bg-gray-100 p-6 rounded-lg mb-8 relative flex">
          <div className="flex-1">
            {credentialContext?.hasStudentId =="true" ? (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  Check out the courses
                </h2>
                <p className="mb-4 max-w-xl">
                  Now that you have your student ID you can check out the course
                  catalog to start learning!
                </p>
                <Link href="/courses">
                  <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white text--2xl font-bold py-4 px-6 rounded">
                    Course Catalog
                  </button>
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Get Started</h2>
                <p className="mb-4 max-w-xl">
                  To get started with the demo you need to create your
                  Shibetoshi University Student ID. This is a verifiable
                  credential that represents your identity in the university.
                </p>
                {credentialContext?.hasStudentId == "pending" ? (
                 <div className="flex justify-between items-center mb-8">
                 <p className="text-blue-500">
                    Your student ID is being processed. 
                    Please wait a moment.
                  </p>
                 <button
                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                   onClick={refreshCredentials}
                 >
                   Refresh
                 </button>
               </div>
                ):(
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white text--2xl font-bold py-4 px-6 rounded"
                  onClick={() => openSignup()}
                >
                  Create Student ID
                </button> 
                )}
              </>
            )}
          </div>
          <div className="ml-6">
            {credentialContext?.hasStudentId != "true"? 
              <StudentIdCard />
              : 
              credentialContext?.studentId?.nfts.slice(0,1).map((nft) => (
                <Credential
                  key={`${nft.contractAddress}:${nft.tokenId}`}
                  collection={credentialContext?.studentId!}
                  nft={nft}
                  imageUrl={nft.metadata.image}
                  title={nft.metadata.name}
                  description={nft.metadata.description}
                  setIsProcessing={setIsProcessing}
                /> 
              ))
              }
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-8">Ready to build?</h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-100 p-6 rounded-lg relative">
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
          <div className="bg-gray-100 p-6 rounded-lg relative">
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
          <div className="bg-gray-100 p-6 rounded-lg relative">
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

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Verifying Credentials with an External Issuer
        </h2>

        <div className="bg-gray-100 p-6 rounded-lg mb-8 relative flex">
          <p className="flex-1 text-lg mb-8">
            The credentials that are issued to you from Shibetoshi University
            can also be used as prerequisites at other Universities that
            implement the verifiable credential standard.
          </p>

          <br />

          <Link href="/dogemoto">
            <button className="mt-4 bg-green-500 hover:bg-green-700 text-white text--2xl font-bold py-4 px-6 rounded">
              Verify at Dogemoto
            </button>
          </Link>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        submit={submitForm}
      >
        <form ref={formRef}>
          <NewStudent wallet={walletAddress || ""} />
        </form>
      </Modal>

      <Overlay start={isProcessing} message="Processing..." />
    </>
  );
};

export default Content;
