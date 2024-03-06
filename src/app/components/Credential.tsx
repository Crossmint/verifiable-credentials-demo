"use client";

import React, { useState } from "react";
import { useCredentials } from "@context/credentials";
import { FaCheckCircle } from "react-icons/fa";

interface CredentialProps {
  credentialId: string;
  imageUrl: string;
  title: string;
  description: string;
  setIsProcessing: Function;
}

const Credential: React.FC<CredentialProps> = ({
  credentialId,
  imageUrl,
  title,
  description,
  setIsProcessing,
}) => {
  const [isValid, setIsValid] = useState<boolean>();
  const credentialContext = useCredentials();

  const retrieveCredential = async () => {
    setIsProcessing(true);

    try {
      const credential = await credentialContext?.retrieve(credentialId);
      const decrypted = await credentialContext?.decrypt(credential);
      const verified = await credentialContext?.verify(decrypted);

      setIsValid(verified.validVC);
    } catch (e) {
      setIsValid(false);
    }

    setIsProcessing(false);
  };

  return (
    <div className="flex rounded overflow-hidden shadow-lg bg-white">
      <img src={imageUrl} alt="credential image" width="256" height="256" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-sm">{description}</p>

        {isValid ? (
          <div className="flex items-center max-w-32 bg-green-200 text-green-700 mt-4 py-2 px-4 rounded">
            <FaCheckCircle className="mr-1" />
            <span>Verified</span>
          </div>
        ) : (
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={retrieveCredential}
          >
            Verify Credential
          </button>
        )}
      </div>
    </div>
  );
};

export default Credential;
