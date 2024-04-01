/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com",
                protocol: "https"
            },
            {
                hostname: "images.unplash.com",
                protocol: "https"
            },
            {
                hostname: "cdn.pixabay.com",
                protocol: "https"
            }
        ]
    }
};

export default nextConfig;
