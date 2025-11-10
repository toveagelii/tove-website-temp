// Test script to check actual artwork dimensions in Sanity
import { sanityClient } from './lib/sanity.client.js';

const query = `
  *[_type == "project" && category == "discography"] | order(year desc) {
    _id,
    title,
    "artworkMetadata": artwork.asset-> {
      _id,
      metadata {
        dimensions {
          width,
          height,
          aspectRatio
        }
      }
    }
  }
`;

async function checkArtwork() {
  try {
    const projects = await sanityClient.fetch(query);
    console.log('=== DISCOGRAPHY PROJECT ARTWORK DIMENSIONS ===\n');
    projects.forEach(p => {
      const dims = p.artworkMetadata?.metadata?.dimensions;
      if (dims) {
        console.log(`${p.title}:`);
        console.log(`  Width: ${dims.width}px`);
        console.log(`  Height: ${dims.height}px`);
        console.log(`  Aspect Ratio: ${dims.aspectRatio.toFixed(3)}`);
        console.log(`  Is Square: ${dims.width === dims.height ? 'YES' : 'NO'}`);
        console.log('');
      } else {
        console.log(`${p.title}: NO ARTWORK METADATA`);
        console.log('');
      }
    });
  } catch (error) {
    console.error('Error fetching artwork:', error);
  }
}

checkArtwork();
