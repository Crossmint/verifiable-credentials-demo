"use client";

import React, { useState } from "react";
import { useCredentials } from "@context/credentials";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { Collection, VCNFT , VerifiableCredential} from "@crossmint/client-sdk-verifiable-credentials";

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
  const [getCredential, setGetCredential] = useState<VerifiableCredential|undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const credentialContext = useCredentials();

  const retrieveCredential = async () => {
    setIsProcessing(true);

    try {
      const credential = await credentialContext?.retrieve(collection, nft.tokenId);
      //const decrypted = await credentialContext?.decrypt(credential);
      setGetCredential(credential);
    } catch (e) {
      setIsValid(false);
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
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-gray-700 text-sm mb-4">{description}</p>
            <div className="flex flex-col md:flex-row">

              <img src={imageUrl} alt="credential image" className="mb-4 md:mb-0 md:mr-4" width="256" height="256" />

              <div className="flex flex-col justify-between">
                
                <div className="text-gray-700 text-sm">
                  {isCourseNft() ? (
                    <div>
                  <p><strong>Course Name:</strong> {getCredential?.credentialSubject.courseName}</p>
                  <p><strong>Course Number:</strong> {getCredential?.credentialSubject.courseNumber}</p>
                  <p><strong>Final Grade:</strong> {getCredential?.credentialSubject.finalGrade}</p>
                  <p><strong>Completed:</strong> {(new Date(getCredential?.credentialSubject.issueDate)).toDateString()}</p>
                  <p><strong>Expires At:</strong> {getCredential?.validUntil }</p>
                  </div>)
                  :
                  (<div>
                  <p><strong>First Name:</strong> {getCredential?.credentialSubject.firstName}</p>
                  <p><strong>Last Name:</strong> {getCredential?.credentialSubject.lastName}</p>
                  <p><strong>Student ID:</strong> {getCredential?.credentialSubject.studentId}</p>
                  <p><strong>Expires At:</strong> {getCredential?.validUntil }</p>
                  </div>
                  )
                }
                </div>
              </div>
            </div>
            

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
        </div>
      )}
    </>
  );
};

export default Credential;
