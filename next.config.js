/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cpd-admin.apexnile.com',
                pathname: '/uploads/**'
            },
            { hostname: 'tailwindui.com' },
            { hostname: 'cpd-admin.apexnile.com' },
            { hostname: 'images.unsplash.com' },
        ],
    },
};

module.exports = nextConfig
