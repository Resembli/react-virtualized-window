// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Le-UI",
  tagline: "Build interactive, accessible, and data dense applications quickly",
  url: "https://resembli.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  onDuplicateRoutes: "throw",
  favicon: "favicon.ico",
  organizationName: "Resembli",
  projectName: "Le-UI",

  themes: ["@docusaurus/theme-live-codeblock"],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/Resembli/le-ui/edit/main/docs/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/main.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig;} */
    {
      algolia: {
        appId: "PZCG2I7O2N",
        apiKey: "259fbd7acef20a9273cb6f13ebcd63f3",
        indexName: "le-ui",
      },
      navbar: {
        title: "Le-UI",
        logo: {
          alt: "Resembli logo",
          src: "resembli-icon.svg",
        },
        items: [
          {
            href: "/docs",
            position: "left",
            label: "Documentation",
          },
          {
            href: "https://github.com/Resembli/le-ui",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Resembli.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    },
}

module.exports = config
