/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'padrian-community-board.s3.amazonaws.com',
                unoptimized: true
            },
        ],
        domains: ['example.com'],
    },
};

export default nextConfig;