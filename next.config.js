// @ts-check

const isProd = process.env.NODE_ENV === 'production'
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/achhunna-gh-test' : '',
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
