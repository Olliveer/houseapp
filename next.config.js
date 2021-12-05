/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'assets.vercel.com',
      'bayut-production.s3.eu-central-1.amazonaws.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
};
