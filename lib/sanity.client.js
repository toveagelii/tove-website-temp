import { createClient } from "next-sanity";

const isProd = process.env.NODE_ENV === 'production';

export const sanityClient = createClient({
  projectId: "dxhekk78",   // your actual project ID
  dataset: "production",    // the default dataset
  apiVersion: "2025-10-31", // API version
  // Disable CDN in development so content updates are immediate
  useCdn: false,  // Force disable CDN to ensure fresh data
});
