"use client";

import React from "react";
import { useCredentials } from "@context/credentials";
import Credential from "@components/Credential";

// verifyCredential(valid_vc as VerifiableCredential).then((res) => {
//   console.log(res);
// });

// getMetadata("0x5F941092d2b1C984DB0789686fDB029393714C0d", env).then(
//   (data: any) => console.log(data)
// );

const Page = () => {
  const credentialContext = useCredentials();
  const credentials = credentialContext?.credentials;
  const wallet = credentialContext?.wallet;

  console.log("profile page.tsx / credentials: ", credentials);

  return (
    <>
      <h1 className="text-xl text-white">Your Credentials</h1>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {credentials?.map((credential) =>
          credential.nfts.map((nft) => (
            <Credential
              key={nft.metadata.credentialId}
              imageUrl={nft.metadata.image}
              title={nft.metadata.name}
              description={nft.metadata.description}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Page;
