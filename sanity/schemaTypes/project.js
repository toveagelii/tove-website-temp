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
  ],
};
