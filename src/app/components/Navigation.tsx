import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Orbitron } from "next/font/google";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

const orbitron = Orbitron({ subsets: ["latin"] });

const Navigation = () => {
  const pathname = usePathname();
  const isThirdParty = pathname === "/dogemoto";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 ${
        isThirdParty ? "bg-[#0e558a]" : "bg-[#8C1515]"
      } shadow-lg custom-glow z-50`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 ">
        <div
          className={`flex items-center text-white text-xl ${orbitron.className}`}
        >
          <Image
            src={isThirdParty ? "/dogemoto-logo.png" : "/shibetoshi-logo.png"}
            alt="Shibetoshi Logo"
            width={40}
            height={40}
          />
          <span className="px-5">
            {isThirdParty ? "Dogemoto" : "Shibetoshi"} University
          </span>
        </div>
        <div className="links flex gap-4">
          <Link className="px-4 py-2" href="/">
            Home
          </Link>
          <Link className="px-4 py-2" href="/courses">
            Courses
          </Link>
          <Link className="px-4 py-2" href="/profile">
            Profile
          </Link>
          <DynamicWidget />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
