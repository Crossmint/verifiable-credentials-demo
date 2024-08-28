"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  verifyCredential,
  VerifiableCredential,
  CredentialService,
  getCredentialNfts,
  crossmintAPI,
  Lit,
  Collection,
  VCNFT as Nft,
} from "@crossmint/client-sdk-verifiable-credentials";

type Wallet = {
  address: string;
};

type CredentialContextType = {
  collections: Collection[];
  retrieve: Function;
  decrypt: Function;
  verify: Function;
  wallet: Wallet;
  refreshCredentials: Function;
  hasStudentId: "true" | "false" | "pending";
  setPendingStudentId: () => void;
  studentId: Collection | null;
  completedCourses: string[];
  pendingCourses: String[];
  addPendingCourse: (courseId: string) => void;
};

const CredentialContext = createContext<CredentialContextType | null>(null);

export function CredentialProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collections, setCollections] = useState<Collection[] | null>(null);
  const [hasStudentId, setHasStudentId] = useState<"false"|"true"|"pending" >("false");
  const [studentIdCollection, setStudentIdCollection] = useState<Collection | null>(null);
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [pendingCourses, setPendingCourses] = useState<string[]>([]);
  const setPendingStudentId = () => {
    setHasStudentId("pending");
  };

  const { primaryWallet: wallet, handleUnlinkWallet  } = useDynamicContext();
  const environment = process.env.NEXT_PUBLIC_CROSSMINT_ENV || "";

  useEffect(() => {
    const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY || "";
    crossmintAPI.init(clientKey,{ environment:"staging"});

    if (!wallet) {
      setCollections([]);
      setHasStudentId("false");
      setCompletedCourses([]);
      return;
    }
    if (!collections || collections.length === 0) {
      getCollections(wallet?.address || "");
    }
  }, [wallet]);

  const getCollections = async (wallet: string) => {
    const collections: any = wallet
      ? await getCredentialNfts(
          "polygon-amoy",
          wallet,
          // removing filtering to keep it simple
          // {
          //   // issuers: [
          //   //   "did:polygon-amoy:0xa22CaDEdE67c11dc1444E507fDdd9b831a67aBd1",
          //   // ],
          //   // types: [
          //   //   "crossmint:b2166c3f-5b93-4064-9d3c-9bb6be9b4f94:StudentId",
          //   //   "Course",
          //   // ],
          // },
        )
      : [];

    // removing filtering for now to keep it simple
    // const validContracts = [
    //   "0xd32E7a29A0650fdE3218cA9dF37306ad66ebbf3c", // student id
    //   "0xe9AfD2F4266563c02C92f2875fFbd894dEd367E1", // courses
    // ];

    // const filtered = collections?.filter((obj: any) =>
    //   validContracts.includes(obj.contractAddress)
    // );


    const filtered = collections;
    console.log("filtered:", filtered);
    setCollections(filtered || []);

    const studentIdCollection = collections?.find(
      (collection: any) =>
        collection.contractAddress ===
        process.env.NEXT_PUBLIC_STUDENT_ID_CONTRACT
    );
    setStudentIdCollection(studentIdCollection);
    const studentIdExists = studentIdCollection ? true : false;

    const studentIdStatus = studentIdExists ? "true" : (hasStudentId === "pending" ? "pending" : "false");
    setHasStudentId(studentIdStatus);

    const completed: any[] = (filtered || []).flatMap(
      (collection: Collection) =>
        collection.nfts.flatMap((nft: Nft) => {
          const courseAttributes = nft.metadata.attributes.filter(
            (attribute: any) =>
              attribute.trait_type === "credentialType" &&
              attribute.value === "course"
          );
          if (courseAttributes.length > 0) {
            const courseIdAttribute = nft.metadata.attributes.find(
              (attribute: any) => attribute.trait_type === "courseId"
            );
            return courseIdAttribute ? courseIdAttribute.value : [];
          }
          return [];
        })
    );

    setCompletedCourses(completed);
  };

  const retrieve = async (collection:Collection, tokenId:string) => {
    console.debug(`retrieving credential for collection ${collection.contractAddress} and tokenId ${tokenId}`);
    const credential = await new CredentialService().getCredential(collection, tokenId);
    console.debug("retrieve credential result: ", credential);

    return credential;
  };

  const decrypt = async (credential: any) => {
    const lit = new Lit("manzano");
    console.debug("about to decrypt payload: ", credential.payload);
    const decrypted = await lit.decrypt(credential);
    console.debug("decrypt credential result: ", decrypted);

    return decrypted;
  };

  const verify = async (credential: VerifiableCredential) => {
    console.debug("about to verify credential: ", credential);
    const verified = await verifyCredential(credential);
    console.debug("verify credential result:", verified);

    return verified;
  };

  return (
    <CredentialContext.Provider
      value={{
        collections: collections || [],
        retrieve: retrieve,
        decrypt: decrypt,
        verify: verify,
        wallet: wallet || { address: "" },
        refreshCredentials: () => getCollections(wallet?.address || ""),
        hasStudentId: hasStudentId,
        setPendingStudentId: setPendingStudentId,
        studentId:studentIdCollection,
        completedCourses: completedCourses,
        pendingCourses: pendingCourses,
        addPendingCourse: (courseId: string) => {
          setPendingCourses([...pendingCourses, courseId]);
        },
      }}
    >
      {children}
    </CredentialContext.Provider>
  );
}

export function useCredentials() {
  return useContext(CredentialContext);
}
