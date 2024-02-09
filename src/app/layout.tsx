import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import Layout from "./context/dynamic";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verifiable Credentials Demo",
  description: "Built with ❤️ by Crossmint",
};

const fira = Fira_Code({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full bg-black bg-opacity-80 ${fira.className}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
