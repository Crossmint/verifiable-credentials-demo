"use client";

import React, { useState } from "react";
import { useCredentials } from "@context/credentials";
import Credential from "@components/Credential";
import Overlay from "@components/Overlay";

const Page = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const credentialContext = useCredentials();
  const collections = credentialContext?.collections;
  const wallet = credentialContext?.wallet;

  const refreshCredentials = async () => {
    setIsProcessing(true);
    await credentialContext?.refreshCredentials(wallet?.address);
    setIsProcessing(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl py-3">Your Credentials</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={refreshCredentials}
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {collections?.map((collection) =>
          collection.nfts.map((nft) => (
            <Credential
              key={nft.metadata.credentialId}
              credentialId={nft.metadata.credentialId}
              imageUrl={nft.metadata.image}
              title={nft.metadata.name}
              description={nft.metadata.description}
              setIsProcessing={setIsProcessing}
            />
          ))
        )}
      </div>

      <Overlay start={isProcessing} message="Processing..." />
    </>
  );
};

export default Page;
