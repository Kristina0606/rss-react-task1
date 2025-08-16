// @ts-check

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  images: {
    domains: ['example.com'],
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
};
