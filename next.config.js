/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['bayut-production.s3.eu-central-1.amazonaws.com']
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  experimental: {
    forceSwcTransforms: true,
  },
  nextConfig
}
