"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  verifyCredential,
  VerifiableCredential,
  CredentialService,
  getCredentialNfts,
  crossmintAPI,
  Lit,
  Collection,
} from "@crossmint/client-sdk-verifiable-credentials";

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
    crossmintAPI.init(clientKey,{ environment:"staging"});
        
    if (!wallet) {
      setCollections([]);
      return;
    }

    getCollections(wallet?.address || "");
  }, [wallet]);


  const refreshCredentials = async () => {
    setIsProcessing(true);
    await  getCollections(wallet?.address || "");
    setIsProcessing(false);
  };
  const getCollections = async (wallet: string) => {
    const collections: any = wallet
      ? await getCredentialNfts(
          "polygon-amoy",
          wallet,
          undefined,
        )
      : [];

    // remove filtering for simplicity for now
    // it would makes sense for the third part to maintain a list of contracts they will accept as valid credentials
    // and only list those credentials. Doing so will also pre-filter out the irrelevant Shibetoshi student ID
    // const validContracts = [
    //   "0x4a0479F1961b7AD8C60E5E1B36e44a0B7D2ba7fe", // Shibetoshi University courses
    // ];

    // const filtered = collections?.filter((obj: any) =>
    //   validContracts.includes(obj.contractAddress)
    // );

    const filtered = collections;

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
                project than Shibetoshi University to retrieve the credentials.
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl py-3">Your Credential NFTs</h1>
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
                key={`${nft.contractAddress}:${nft.tokenId}`}
                collection={collection}
                nft={nft}
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
