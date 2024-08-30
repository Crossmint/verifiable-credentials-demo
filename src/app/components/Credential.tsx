"use client";

import React, { useState } from "react";
import { useCredentials } from "@context/credentials";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { Collection, VCNFT , VerifiableCredential, EncryptedVerifiableCredential} from "@crossmint/client-sdk-verifiable-credentials";

interface CredentialProps {
  key: string;
  collection:Collection,
  nft:VCNFT,
  imageUrl: string;
  title: string;
  description: string;
  setIsProcessing: Function;
}

const Credential: React.FC<CredentialProps> = ({
  key,
  collection,
  nft,
  imageUrl,
  title,
  description,
  setIsProcessing,
}) => {
  const [isValid, setIsValid] = useState<boolean>();
  const [failedDecrypt, setFailedDecrypt] = useState<boolean>(false);
  const [getCredential, setGetCredential] = useState<VerifiableCredential|undefined>(undefined);
  const [getEncCredential, setGetEncCredential] = useState<EncryptedVerifiableCredential|undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isEncrypted=collection.metadata.credentialMetadata.encryption.type!=="none";
  const credentialContext = useCredentials();

  const retrieveCredential = async () => {
    setIsProcessing(true);

    try {
      const credential = await credentialContext?.retrieve(collection, nft.tokenId);
      if (isEncrypted) {
        console.log("Encrypted Credential: ",credential);
        setGetEncCredential(credential);
      }else{
        setGetCredential(credential);
      }
    } catch (e) {
      setIsValid(false);
    }

    setIsProcessing(false);
  };

  const decryptCredential = async () => {
    setIsProcessing(true);

    try {
      const decrypted = await credentialContext?.decrypt(getEncCredential);
      setGetCredential(decrypted);
      setFailedDecrypt(false);
    } catch (e) {
      setFailedDecrypt(true);
    }

    setIsProcessing(false);
  };

  const verifyCredential = async () => {

    try {
      const verified = await credentialContext?.verify(getCredential);
      setIsValid(verified.validVC);
    } catch (e) {
      setIsValid(false);
    }
  };

  const isCourseNft = () => {
    return nft.metadata.attributes.filter(
      (attribute: any) =>
        attribute.trait_type === "credentialType" &&
        attribute.value === "course"
    ).length > 0;
  }

  return (
    <>
      <div key={key} className="flex rounded overflow-hidden shadow-lg bg-white">
        <img src={imageUrl} alt="credential image" width="256" height="256" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-sm">{description}</p>

          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              retrieveCredential().then(() =>
              setIsModalOpen(true))
            }}
          >
            See Credential
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center md:text-left">{title}</h2>
            <p className="text-gray-600 text-sm mb-6 text-center md:text-left">{description}</p>

            <div className="flex flex-col md:flex-row items-center md:items-start">
              <img
                src={imageUrl}
                alt="credential image"
                className="rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
                width="256"
                height="256"
              />

              {isEncrypted && !getCredential ? (
                <p className="mb-4">
                        This credential is encrypted. Please decrypt it to view the contents.
                      </p>              ) : (

              <div className="flex flex-col justify-between bg-gray-100 p-6 rounded-lg shadow-inner w-full md:w-auto">
                <div className="text-gray-700 text-sm leading-relaxed">
                  {isCourseNft() ? (
                    <div>
                      <p className="mb-4">
                        <span className="font-bold">Course Name:</span><br />
                        {getCredential?.credentialSubject.courseName}
                      </p>

                      <p className="mb-4">
                        <span className="font-bold">Course Number:</span><br />
                        {getCredential?.credentialSubject.courseNumber}
                      </p>

                      <p className="mb-4">
                        <span className="font-bold">Final Grade:</span><br />
                        {getCredential?.credentialSubject.finalGrade}
                      </p>

                      <p className="mb-4">
                        <span className="font-bold">Completed:</span><br />
                        {new Date(getCredential?.credentialSubject.issueDate).toDateString()}
                      </p>

                      <p className="mb-4">
                        <span className="font-bold">Expires At:</span><br />
                        {getCredential?.validUntil}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="mb-4">
                        <span className="font-bold">First Name:</span><br />
                        {getCredential?.credentialSubject.firstName}
                      </p>

                      <p className="mb-4">
                        <span className="font-bold">Last Name:</span><br />
                        {getCredential?.credentialSubject.lastName}
                      </p>

                      <p className="mb-4">
                        <span className="font-bold">Student ID:</span><br />
                        {getCredential?.credentialSubject.studentId}
                      </p>

                      <p className="mb-4">
                        <span className="font-bold">Expires At:</span><br />
                        {getCredential?.validUntil}
                      </p>
                    </div>
                  )}
                </div>
              </div>
                )}

            </div>
        
            {isEncrypted && !getCredential ? (<div>
              {failedDecrypt && (
                <div className="flex items-center max-w-32 mt-4 py-2 px-4 rounded bg-red-200 text-red-700">
                  <FaTimes className="mr-1" />
                  <span>Failed to decrypt</span>
                </div>
              ) }
               
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={decryptCredential}
                >
                  Decrypt Credential
                </button>
              
            </div>):
            (<div>
            {isValid !== undefined ? (
              <div className={`flex items-center max-w-32 mt-4 py-2 px-4 rounded ${isValid ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                <FaCheckCircle className="mr-1" />
                <span>{isValid ? 'Verified' : 'Invalid'}</span>
              </div>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={verifyCredential}
              >
                Verify Credential
              </button>
            )}
            </div>
          )}
          </div>
        </div>
      )}
    </>
  );
};

export default Credential;
