import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "dxhekk78",   // your actual project ID
  dataset: "production",    // the default dataset
  apiVersion: "2025-10-31", // today’s date for the API version
  // Disable CDN so Studio edits show up immediately on the website
  useCdn: false,
});
