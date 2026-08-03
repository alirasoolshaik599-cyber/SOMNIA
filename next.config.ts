import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.10"], // replace with your machine's actual LAN IP shown in the terminal
  /* config options here */
};

export default nextConfig;
