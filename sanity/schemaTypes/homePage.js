export default {
  name: "homePage",
  title: "Home Page",
  type: "document",
  preview: {
    prepare() {
      return {
        title: "Home Page"
      };
    }
  },
  fields: [
    {
      name: "aboutText",
      title: "About Text",
      type: "text",
      rows: 6,
      description: "The intro/about text displayed on the homepage."
    },
    {
      name: "headerBackgroundImage",
      title: "Header Background Image",
      type: "image",
      description: "Image that appears behind the 'Tove Agelii' header text. Will be sized to match the text dimensions.",
      options: {
        hotspot: true
      }
    },
    {
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      description: "Full Instagram profile link (e.g., https://www.instagram.com/_toxe_/)."
    },
    {
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description: "Full YouTube channel link."
    },
    {
      name: "spotifyUrl",
      title: "Spotify URL",
      type: "url",
      description: "Full Spotify artist link."
    },
    {
      name: "soundcloudUrl",
      title: "SoundCloud URL",
      type: "url",
      description: "Full SoundCloud profile link."
    },
    {
      name: "bandcampUrl",
      title: "Bandcamp URL",
      type: "url",
      description: "Full Bandcamp artist link."
    }
  ]
};
