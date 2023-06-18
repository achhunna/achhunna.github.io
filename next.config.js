// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output: 'export',
  basePath: '',
  experimental: {
    appDir: true,
  },
  env: {
    REACT_APP_MAPBOX_ACCESS_TOKEN:
      process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? '',
    REACT_APP_AIR_LABS_API_KEY: process.env.REACT_APP_AIR_LABS_API_KEY ?? '',
  },
}

module.exports = nextConfig
