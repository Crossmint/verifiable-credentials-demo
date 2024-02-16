"use client";

import React, { useEffect } from "react";
import { useCredentials } from "@context/credentials";
import Credential from "@components/Credential";

// verifyCredential(valid_vc as VerifiableCredential).then((res) => {
//   console.log(res);
// });

// getMetadata("0x5F941092d2b1C984DB0789686fDB029393714C0d", env).then(
//   (data: any) => console.log(data)
// );

const getCredential = async (context: any) => {
  const idCred = await context
    .retrieve("urn:uuid:628fe2cd-c350-4cca-ad00-06d3680c778c")
    .then((data: any) => {
      console.log("please...", data);
    });

  return idCred;
};

const Page = () => {
  const credentialContext = useCredentials();
  const collections = credentialContext?.collections;
  const wallet = credentialContext?.wallet;

  const refreshCredentials = () => {
    credentialContext?.refreshCredentials(wallet?.address);
    //getCredential(credentialContext);
  };

  return (
    <>
      <h1 className="text-xl text-white">Your Credentials</h1>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {collections?.map((collection) =>
          collection.nfts.map((nft) => (
            <Credential
              key={nft.metadata.credentialId}
              credentialId={nft.metadata.credentialId}
              imageUrl={nft.metadata.image}
              title={nft.metadata.name}
              description={nft.metadata.description}
            />
          ))
        )}
      </div>

      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={refreshCredentials}
      >
        Refresh
      </button>
    </>
  );
};

export default Page;
