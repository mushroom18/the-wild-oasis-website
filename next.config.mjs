/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["josfxdaheuubqlfgrvqu.supabase.co", "lh3.googleusercontent.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  //output: "export",
};

export default nextConfig;
