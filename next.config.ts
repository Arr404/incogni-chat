import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/register',
                permanent: false
            }
        ];
    }
};

export default nextConfig;