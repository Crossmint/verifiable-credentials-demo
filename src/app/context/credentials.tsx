import React, { createContext, useState, useEffect, useContext } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  verifyCredential,
  VerifiableCredential,
  getCredentialFromId,
  getCredentialCollections,
  getMetadata,
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
};

const CredentialContext = createContext<CredentialContextType | null>(null);

const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY || "";
CrossmintAPI.init(clientKey);

export function CredentialProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wallet, setWallet] = useState<Wallet | null>();
  const [collections, setCollections] = useState<Collection[] | null>(null);
  const { primaryWallet } = useDynamicContext();
  const environment = process.env.NEXT_PUBLIC_CROSSMINT_ENV || "";

  useEffect(() => {
    setWallet(primaryWallet);
  }, [primaryWallet]);

  useEffect(() => {
    if (wallet?.address) {
      getCollections(wallet?.address);
    }
  }, [wallet?.address]);

  const getCollections = async (wallet: string) => {
    const collections: any = await getCredentialCollections(
      "polygon",
      wallet,
      undefined,
      environment
    );

    const validContracts = [
      "0xC54424bd19462ad3358404c24523C9752f9D8B34", // student id (encrypted)
      //"0x4bA6A45Da8A7039f5b1ED466971719F26790f733", // student id
      "0xfB93e9e1466110F5114B9D65c3E68615057E62A8", // courses
      "0x010beF737dA4f831EaBAf0B6460e5b3Df32Ec9F5", // certificate
    ];

    const filtered = collections.filter((obj: any) =>
      validContracts.includes(obj.contractAddress)
    );

    setCollections(filtered);
  };

  const retrieve = async (id: string) => {
    console.log("id: ", id);
    getCredentialFromId(id, environment).then((data: any) => {});

    const logCred = (cred: any) => {
      console.log("cred: ", cred);
    };
  };

  const decrypt = () => {};

  const verify = (credential: VerifiableCredential) => {
    console.log("credentials.tsx verify called", credential);
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
      }}
    >
      {children}
    </CredentialContext.Provider>
  );
}

// Create a custom hook for consuming the context
export function useCredentials() {
  return useContext(CredentialContext);
}
