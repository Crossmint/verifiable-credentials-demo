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
    if (wallet?.address) {
      const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY || "";
      const serverKey = process.env.CROSSMINT_API_KEY || "";
      CrossmintAPI.init(clientKey, ["https://ipfs.io/ipfs/{cid}"]);
      const lit = new Lit();

      getCollections(wallet?.address);
    }
  }, [wallet?.address]);

  const getCollections = async (wallet: string) => {
    const collections: any = await getCredentialCollections(
      "polygon",
      wallet,
      {
        issuers: ["did:polygon:0xa22CaDEdE67c11dc1444E507fDdd9b831a67aBd1"],
        types: ["StudentId", "CourseSchema"],
      },
      environment
    );

    const validContracts = [
      "0xd9eeC3D7BE67F02Ca103c0C27fc45f4AA6612360", // student id
      "0x6cacd4EC40967FfC7430c2cD552bcF8B2c61391f", // courses
      //"0x010beF737dA4f831EaBAf0B6460e5b3Df32Ec9F5", // certificate
    ];

    const filtered = collections.filter((obj: any) =>
      validContracts.includes(obj.contractAddress)
    );

    console.log("filtered:", filtered);
    setCollections(filtered);

    const studentIdExists = collections.some(
      (collection: any) =>
        collection.contractAddress ===
        "0xd9eeC3D7BE67F02Ca103c0C27fc45f4AA6612360"
    );
    setHasStudentId(studentIdExists);

    const completed: string[] = filtered.flatMap((collection: Collection) =>
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
    console.log("id: ", id);
    const cred = await getCredentialFromId(id, environment);

    console.log("cred: ", cred);
  };

  const decrypt = async (credential: any) => {
    const lit = new Lit();
    const output = await lit.decrypt(credential?.payload);
    console.log("output: ", output);

    return output;
  };

  const verify = async (credential: VerifiableCredential) => {
    console.log("credentials.tsx verify called", credential);

    const lit = new Lit();

    //const output = await lit.decrypt(credential?.encryptedCredential?.payload);

    //console.log("output: ", output);

    return verifyCredential(credential);
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
