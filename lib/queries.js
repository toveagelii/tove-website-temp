// lib/queries.js

export const discographyProjectsQuery = `
  *[_type == "project" && category == "discography"] | order(year desc) {
    _id,
    title,
    year,
    slug,
    artwork
  }
`;

export const scoreProjectsQuery = `
  *[_type == "project" && category == "score"] | order(year desc) {
    _id,
    title,
    year,
    slug,
    artwork
  }
`;
