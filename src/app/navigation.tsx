"use client";

import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname hook
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"] });

const Navigation = () => {
  const pathname = usePathname(); // Use the hook to get the current pathname

  // Function to determine if the link is active based on the current pathname
  const isActive = (route: string) => pathname === route;

  // Define a base class for the links
  const linkBaseClass = "text-white px-5 py-2";

  // Extend the base class with conditional styling for active links
  const linkClass = (route: string) =>
    isActive(route) ? `${linkBaseClass} text-[#02bdd6]` : linkBaseClass;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black shadow-lg custom-glow z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4 ">
        <div className={`text-white text-xl ${orbitron.className}`}>
          Verifiable Credentials Demo
        </div>
        <div className="links flex gap-4">
          {/* Apply the dynamic class based on the active route */}
          <a href="/" className={linkClass("/")}>
            Home
          </a>
          <a href="/issue" className={linkClass("/issue")}>
            Issue
          </a>
          <a href="/verify" className={linkClass("/verify")}>
            Verify
          </a>
          <DynamicWidget />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
