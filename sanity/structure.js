// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Discography projects
      S.listItem()
        .title('Discography')
        .schemaType('project')
        .child(
          S.documentList()
            .title('Discography')
            .filter('_type == "project" && category == "discography"')
            .defaultOrdering([{ field: 'year', direction: 'desc' }, { field: 'title', direction: 'asc' }])
        ),

      // Score & Sound projects
      S.listItem()
        .title('Score & Sound')
        .schemaType('project')
        .child(
          S.documentList()
            .title('Score & Sound')
            .filter('_type == "project" && category == "score"')
            .defaultOrdering([{ field: 'year', direction: 'desc' }, { field: 'title', direction: 'asc' }])
        ),

      S.divider(),

      // Home Page singleton editor
      S.listItem()
        .title('Home')
        .schemaType('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
        ),

      // Contact Page singleton editor
      S.listItem()
        .title('Contact Page')
        .schemaType('contactPage')
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId('contactPage')
        ),

      // Site Settings singleton editor
      S.listItem()
        .title('Site Settings')
        .schemaType('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
    ])
