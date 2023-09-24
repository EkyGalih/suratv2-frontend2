/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    env: {
        HOST: process.env.HOST,
    }
};

module.exports = nextConfig
