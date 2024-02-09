"use client";

import React, { useState, useEffect } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  verifyCredential,
  VerifiableCredential,
  getCredentialCollections,
  getMetadata,
  CrossmintAPI,
  Lit,
} from "@crossmint/verify-credentials";
import Credential from "@components/credential";

type Wallet = {
  address: string;
};

//const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY || "";
const apiKey = process.env.NEXT_PUBLIC_CROSSMINT_API_KEY || "";
CrossmintAPI.init(apiKey);

const env = "staging";

// verifyCredential(valid_vc as VerifiableCredential).then((res) => {
//   console.log(res);
// });

// getMetadata("0xdEA47019054eBDf6e74DD47961b58F66D5Ad5e8C", "test").then(. // get contract level metadata
//     (data: any) => console.log(data)
// ); (edited)

getCredentialCollections(
  "polygon",
  "0x6C3b3225759Cbda68F96378A9F0277B4374f9F06",
  undefined,
  env
)
  .then((data: any) => console.log("sdk data:", data))
  .catch((error: Error) => console.error(error));

interface CredentialData {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

const Page = () => {
  const [wallet, setWallet] = useState<Wallet | null>();
  const [creds, setCreds] = useState<any[] | null>();
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    setWallet(primaryWallet);

    retrieveCredentials();
  }, [primaryWallet]);

  const retrieveCredentials = async () => {
    if (wallet?.address) {
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

      setCreds(data);
    }
  };
  return (
    <>
      <h1 className="text-xl text-white">Your Credentials</h1>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {creds?.map((credential) => (
          <Credential
            key={credential.credential.id}
            imageUrl={credential.metadata.image}
            title={credential.metadata.name}
            description={credential.metadata.description}
          />
        ))}
      </div>
    </>
  );
};

export default Page;
