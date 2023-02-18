/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  trailingSlash: true,
  publicRuntimeConfig: {
    apiUrl: process.env.ANIMNYA_API_URL,
    GMTId: process.env.GTM_ID, 
  }
}

module.exports = nextConfig
