"use client";

import React from "react";
import { useCredentials } from "@context/credentials";

interface CredentialProps {
  credentialId: string;
  imageUrl: string;
  title: string;
  description: string;
}

const Credential: React.FC<CredentialProps> = ({
  credentialId,
  imageUrl,
  title,
  description,
}) => {
  const credentialContext = useCredentials();

  const retrieveCredential = async () => {
    // const response = await fetch(`/api/retrieve?id=${credentialId}`, {
    //   method: "GET",
    // });
    // const data = await response.json();
    // console.log(data);

    const credential = await credentialContext?.retrieve(credentialId);

    const decrypted = await credentialContext?.decrypt(credential);

    //const verified = await credentialContext?.verify(decrypted);
    //console.log("verified result", verified);
  };

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={imageUrl} alt="credential image" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>

        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={retrieveCredential}
        >
          Verify Credential
        </button>
      </div>
    </div>
  );
};

export default Credential;
