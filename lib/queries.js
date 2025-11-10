// lib/queries.js

export const homePageQuery = `
  *[_type == "homePage"][0] {
    aboutText,
    headerBackgroundImage,
    instagramUrl,
    youtubeUrl,
    spotifyUrl,
    soundcloudUrl,
    bandcampUrl
  }
`;

export const contactPageQuery = `
  *[_type == "contactPage"][0] {
    emails[] {
      label,
      email,
      primary
    }
  }
`;

export const discographyProjectsQuery = `
  *[_type == "project" && category == "discography"] | order(year desc) {
    _id,
    title,
    subtitle,
    year,
    slug,
    artwork
  }
`;

export const scoreProjectsQuery = `
  *[_type == "project" && category == "score"] | order(year desc) {
    _id,
    title,
    subtitle,
    year,
    slug,
    artwork
  }
`;

export const projectBySlugQuery = (slug) => `
  *[_type == "project" && slug.current == "${slug}"][0] {
    _id,
    title,
    subtitle,
    year,
    artwork,
    description,
    links[] {
      title,
      url
    },
    videos[] {
      videoFile {
        asset-> {
          _id,
          url
        }
      },
      thumbnail
    },
    youtubeVideos[] {
      url
    }
  }
`;
