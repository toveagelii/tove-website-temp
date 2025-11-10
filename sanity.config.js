
'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import schemaTypes from './sanity/schemaTypes'
import { structure } from './sanity/structure'
import { projectId as envProjectId, dataset as envDataset, apiVersion as envApiVersion } from './sanity/env'

// Studio needs a projectId at runtime. Prefer the env-provided value but
// fall back to a known local project id for development so the studio can
// boot even when .env isn't loaded.
const projectId = envProjectId || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dxhekk78'
const dataset = envDataset || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = envApiVersion || process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-11-01'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
