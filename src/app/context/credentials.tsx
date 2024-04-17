"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  verifyCredential,
  VerifiableCredential,
  getCredentialFromId,
  getCredentialCollections,
  CrossmintAPI,
  Lit,
} from "@crossmint/client-sdk-verifiable-credentials";

type NFT = {
  chain: string;
  contractAddress: string;
  locator: string;
  metadata: {
    name: string;
    description: string;
    credentialId: string;
    image: string;
    attributes?: any;
  };
  tokenId: string;
  tokenStandard: string;
};

export type Collection = {
  contractAddress: string;
  metadata?: any;
  nfts: NFT[];
};

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
  hasStudentId: boolean;
  completedCourses: string[];
};

const CredentialContext = createContext<CredentialContextType | null>(null);

export function CredentialProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collections, setCollections] = useState<Collection[] | null>(null);
  const [hasStudentId, setHasStudentId] = useState(false);
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);

  const { primaryWallet: wallet } = useDynamicContext();
  const environment = process.env.NEXT_PUBLIC_CROSSMINT_ENV || "";

  useEffect(() => {
    const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY || "";
    CrossmintAPI.init(clientKey, ["https://ipfs.io/ipfs/{cid}"]);

    getCollections(wallet?.address || "");
  }, [wallet]);

  const getCollections = async (wallet: string) => {
    const collections: any = wallet
      ? await getCredentialCollections(
          "polygon",
          wallet,
          {
            issuers: ["did:polygon:0xd9d8BA9D5956f78E02F4506940f42ac2dAB9DABd"],
            types: ["StudentId", "CourseSchema"],
          },
          environment
        )
      : [];

    const validContracts = [
      "0xD51aa30BaC1d45dB3A6031657d1b2277D1900238", // student id
      "0x4a0479F1961b7AD8C60E5E1B36e44a0B7D2ba7fe", // courses
      //"0x010beF737dA4f831EaBAf0B6460e5b3Df32Ec9F5", // certificate
    ];

    const filtered = collections?.filter((obj: any) =>
      validContracts.includes(obj.contractAddress)
    );


    console.log("filtered:", filtered);
    setCollections(filtered || []);

    const studentIdExists = collections?.some(
      (collection: any) =>
        collection.contractAddress ===
        "0xD51aa30BaC1d45dB3A6031657d1b2277D1900238"
    );
    setHasStudentId(studentIdExists || false);

    const completed: any[] = (filtered || []).flatMap(
      (collection: Collection) =>
        collection.nfts.flatMap((nft: NFT) => {
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

  const retrieve = async (id: string) => {
    console.debug("retrieving credential with id: ", id);
    const credential = await getCredentialFromId(id, environment);
    console.debug("retrieve credential result: ", credential);

    return credential;
  };

  const decrypt = async (credential: any) => {
    const lit = new Lit();
    console.debug("about to decrypt payload: ", credential.payload);
    const decrypted = await lit.decrypt(credential?.payload);
    console.debug("decrypt credential result: ", decrypted);

    return JSON.parse(decrypted); // this JSON.parse should be removed on next SDK update
  };

  const verify = async (credential: VerifiableCredential) => {
    console.debug("about to verify credential: ", credential);
    const verified = await verifyCredential(credential, environment);
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
        completedCourses: completedCourses,
      }}
    >
      {children}
    </CredentialContext.Provider>
  );
}

export function useCredentials() {
  return useContext(CredentialContext);
}
