import React, { useState, useEffect } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

type Wallet = {
  address: string;
};

const Content = () => {
  const [wallet, setWallet] = useState<Wallet | null>();
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    console.log("wallet:", primaryWallet);
    setWallet(primaryWallet);
  }, [primaryWallet]);

  const issueCredential = async () => {
    const response = await fetch("/api/issue", {
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
  };

  const retrieveCredentials = async () => {
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
  };

  const verifyCredential = async () => {
    const response = await fetch("/api/verify", {
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
  };

  return (
    <>
      <h2>Issue</h2>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        onClick={issueCredential}
      >
        Issue Credential
      </button>

      <h2>Retrieve</h2>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        onClick={retrieveCredentials}
      >
        Retrieve Credentials
      </button>

      <h2>Verify</h2>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        onClick={verifyCredential}
      >
        Verify Credentials
      </button>
    </>
  );
};

export default Content;
