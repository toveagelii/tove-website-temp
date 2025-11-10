import project from "./project";
import contactPage from "./contactPage";
import homePage from "./homePage";
import siteSettings from "./siteSettings";

// Export an array of types as default for tools that expect `default`
const schemaTypes = [project, contactPage, homePage, siteSettings];
export default schemaTypes;

// Also export `{ schema }` for sanity.config.js usage
export const schema = {
  types: schemaTypes,
};
