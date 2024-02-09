"use client";

import React, { ReactNode } from "react";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import Navigation from "../navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID || "",
        initialAuthenticationMode: "connect-only",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <div className="min-w-[300px] md:min-w-[600px] lg:min-w-[960px] max-w-6xl mx-auto">
        <Navigation />
        <main className="min-h-screen max-w-6xl mx-auto p-8">{children}</main>
      </div>
    </DynamicContextProvider>
  );
};

export default Layout;
