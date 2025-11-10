import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'dxhekk78',
  dataset: 'production',
  apiVersion: '2025-11-01',
  useCdn: false, // Set to false for real-time Studio updates
})
