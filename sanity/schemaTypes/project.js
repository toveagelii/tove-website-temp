export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier for the project",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Optional short description under the title, e.g., Original Film Score or Runway Score",
    },
    {
      name: "year",
      title: "Year",
      type: "string",
    },
    {
      name: "artwork",
      title: "Artwork",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Discography", value: "discography" },
          { title: "Score & Sound", value: "score" },
        ],
        layout: "radio", // shows as radio buttons in the studio
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Project description text",
    },
    {
      name: "links",
      title: "Links",
      type: "array",
      description: "Optional links to external pages (e.g., Spotify, Bandcamp, Press)",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Link Title",
              type: "string",
              description: "The display name of the link (e.g., Spotify, Bandcamp)",
              validation: (Rule) => Rule.required().max(80),
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required().uri({ allowRelative: false }),
            },
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }) {
              return { title: title || 'Untitled link' };
            }
          }
        },
      ],
    },
    {
      name: "videos",
      title: "Videos",
      type: "array",
      description: "Upload video files with optional thumbnail images",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "videoFile",
              title: "Video File",
              type: "file",
              options: {
                accept: "video/*",
              },
            },
            {
              name: "thumbnail",
              title: "Video Thumbnail",
              type: "image",
              description: "Optional thumbnail image to display before the video plays",
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              title: "videoFile.asset.originalFilename",
              media: "thumbnail",
            },
          },
        },
      ],
    },
    {
      name: "youtubeVideos",
      title: "YouTube Videos (Music Videos)",
      type: "array",
      description: "Add YouTube video URLs (e.g., https://www.youtube.com/watch?v=VIDEO_ID)",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "url",
              title: "YouTube URL",
              type: "url",
            },
          ],
        },
      ],
    },
  ],
};
