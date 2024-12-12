import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ["ita-ticket.oss-cn-guangzhou.aliyuncs.com"],
    },
};

export default nextConfig;
