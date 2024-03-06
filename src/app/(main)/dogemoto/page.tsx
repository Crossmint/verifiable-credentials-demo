"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  verifyCredential,
  VerifiableCredential,
  getCredentialFromId,
  getCredentialCollections,
  CrossmintAPI,
  Lit,
} from "@crossmint/client-sdk-verifiable-credentials";
import { Collection } from "@context/credentials";
import Credential from "@components/Credential";
import Overlay from "@components/Overlay";
import { FaCheckCircle } from "react-icons/fa";

/*
 * This page purposefully re-implements most of the logic in the credentials context to help illustrate the point that * a third party can perform retrieval and verifiation of credentials.
 */

type Wallet = {
  address: string;
};

const Content = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [collections, setCollections] = useState<Collection[] | null>(null);

  const { primaryWallet: wallet } = useDynamicContext();
  const environment = process.env.NEXT_PUBLIC_CROSSMINT_ENV || "";

  useEffect(() => {
    const clientKey = process.env.NEXT_PUBLIC_DOGEMOTO_KEY || "";
    CrossmintAPI.init(clientKey, ["https://ipfs.io/ipfs/{cid}"]);

    getCollections(wallet?.address || "");
  }, [wallet]);

  const getCollections = async (wallet: string) => {
    const collections: any = wallet
      ? await getCredentialCollections(
          "polygon",
          wallet,
          {
            issuers: ["did:polygon:0xa22CaDEdE67c11dc1444E507fDdd9b831a67aBd1"],
            types: ["CourseSchema"],
          },
          environment
        )
      : [];

    const validContracts = [
      "0x6cacd4EC40967FfC7430c2cD552bcF8B2c61391f", // Shibetoshi University courses
    ];

    const filtered = collections?.filter((obj: any) =>
      validContracts.includes(obj.contractAddress)
    );

    console.log("filtered:", filtered);
    setCollections(filtered || []);
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-6 sm:gap-12 p-4">
          <div className="sm:col-span-4 flex flex-col space-3">
            <h1 className="text-4xl font-bold mt-8 mb-4">
              Welcome to Dogemoto University
            </h1>
            <p className="text-lg mb-5">
              Verify your courses from other Universities here.
            </p>
            <p className="text-md mb-8 font-light">
              This page exists to demonstrate the functionality of third party
              verification of your credentials. Imagine that you have navigated
              to a different university website when using this page.
            </p>
          </div>

          <div className="sm:col-span-2 flex flex-col space-3 mt-6">
            <div className="flex items-center bg-green-200 text-green-700 p-5 my-4 rounded">
              <FaCheckCircle className="mr-4 " size={48} />
              <span>
                This page uses a different client API key within a different
                project than Shibetoshi University to retreive the credentials.
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl py-3">Your Credentials</h1>
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
      </div>

      <Overlay start={isProcessing} message="Processing..." />
    </>
  );
};

export default Content;
