"use client";

import { Roboto } from "next/font/google";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { CredentialProvider } from "@context/credentials";

import Navigation from "@components/Navigation";
import "./globals.css";

const roboto = Roboto({ weight: ["100", "500"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>Shibetoshi University</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`h-full bg-black bg-opacity-80 ${roboto.className}`}>
        <DynamicContextProvider
          settings={{
            environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID || "",
            initialAuthenticationMode: "connect-only",
            walletConnectors: [EthereumWalletConnectors],
          }}
        >
          <CredentialProvider>
            <div className="min-w-[300px] md:min-w-[600px] lg:min-w-[960px] max-w-7xl mx-auto">
              <Navigation />
              <main className="min-h-screen max-w-7xl mx-auto p-8">
                {children}
              </main>
            </div>
          </CredentialProvider>
        </DynamicContextProvider>
      </body>
    </html>
  );
}
