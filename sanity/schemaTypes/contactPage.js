export default {
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  preview: {
    prepare() {
      return {
        title: "Contact Page"
      };
    }
  },
  fields: [
    {
      name: "emails",
      title: "Email Addresses",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label/Description",
              type: "string",
              description: "e.g., 'Inquiries & Commissions', 'EU booking:', 'USA booking:'"
            },
            {
              name: "email",
              title: "Email Address",
              type: "string",
              validation: (Rule) => Rule.required()
            },
            {
              name: "primary",
              title: "Show label above email",
              type: "boolean",
              description: "Enable to show the label above the email address. Leave off to hide the label.",
              initialValue: false
            }
          ],
          preview: {
            select: {
              label: "label",
              email: "email"
            },
            prepare({ label, email }) {
              return {
                title: email,
                subtitle: label || "No label"
              };
            }
          }
        }
      ],
      description: "Add email addresses with optional labels/descriptions."
    }
  ]
};
