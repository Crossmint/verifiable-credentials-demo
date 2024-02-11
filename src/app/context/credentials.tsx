import React, { createContext, useState, useEffect, useContext } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
  verifyCredential,
  VerifiableCredential,
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

// Define the type of your credentials
type Credential = {
  contractAddress: string;
  metadata: any;
  nfts: NFT[];
};

type Wallet = {
  address: string;
};

type CredentialContextType = {
  credentials: Credential[];
  wallet: Wallet;
};

// Create a context
const CredentialContext = createContext<CredentialContextType | null>(null);

const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY || "";
CrossmintAPI.init(clientKey);

// Create a provider component
export function CredentialProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wallet, setWallet] = useState<Wallet | null>();
  const [credentials, setCredentials] = useState<Credential[] | null>(null);
  const { primaryWallet } = useDynamicContext();
  const environment = process.env.NEXT_PUBLIC_CROSSMINT_ENV || "";

  useEffect(() => {
    setWallet(primaryWallet);
    console.log("primaryWallet: ", primaryWallet);
  }, [primaryWallet]);

  useEffect(() => {
    if (wallet?.address) {
      getCredentialCollections(
        "polygon",
        "0x3404253d5c065a9E92Bd0df81729223Cef308fAE",
        undefined,
        environment
      )
        .then((data: any) => {
          finishCreds(data);
        })
        .catch((error: Error) => console.error(error));

      const finishCreds = (creds: any) => {
        console.log("credentials context / creds: ", creds);

        const validContracts = [
          "0x4bA6A45Da8A7039f5b1ED466971719F26790f733", // student id
          "0xfB93e9e1466110F5114B9D65c3E68615057E62A8", // courses
          "0x010beF737dA4f831EaBAf0B6460e5b3Df32Ec9F5", // certificate
        ];
        const filteredCreds = creds.filter((obj: any) =>
          validContracts.includes(obj.contractAddress)
        );
        console.log("credentials context / filteredCreds: ", filteredCreds);

        setCredentials(filteredCreds);
      };
    }
  }, [wallet?.address]);

  return (
    <CredentialContext.Provider
      value={{
        credentials: credentials || [],
        wallet: wallet || { address: "" },
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
