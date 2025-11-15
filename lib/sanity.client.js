import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "dxhekk78",   // your actual project ID
  dataset: "production",    // the default dataset
  apiVersion: "2025-10-31", // todays date for the API version
  // Enable CDN for static data, disables instant live updates
  useCdn: true,
});
