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
  },
}

module.exports = nextConfig
