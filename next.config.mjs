/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sapphire-controlled-herring-537.mypinata.cloud",
        port: "",
        pathname: "/ipfs/**",
      },
    ],
  },
  appDir: true,
};

export default nextConfig;
