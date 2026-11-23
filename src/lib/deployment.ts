/**
 * True only for the live production site. Vercel sets VERCEL_ENV to
 * "production", "preview" or "development"; outside Vercel we fall back to NODE_ENV.
 * Preview deployments are kept out of search engines so they never compete with qulixlabs.com.
 */
export const isProductionSite = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";
