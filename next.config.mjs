/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["josfxdaheuubqlfgrvqu.supabase.co", "lh3.googleusercontent.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  //output: "export",
};

export default nextConfig;
