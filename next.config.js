/** @type {import('next').NextConfig} */

const path = require('path');
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  experimental: {
    // serverActions: true,
  },
  // webpack: (config) => {
  //   config.resolve.alias.canvas = false;

  //   return config;
  // },
};

module.exports = nextConfig;
