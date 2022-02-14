// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Resembli UI",
  tagline: "Build interactive, accessible, and data dense applications quickly",
  url: "https://resembli.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  onDuplicateRoutes: "throw",
  favicon: "favicon.ico",
  organizationName: "Resembli",
  projectName: "Resembli UI",

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/Resembli/ui/edit/main/docs/",
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
        apiKey: "b3f137f34026b6a169c4cfb67459553b",
        indexName: "le-ui",
      },
      defaultMode: "dark",
      navbar: {
        title: "Resembli UI",
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
            href: "https://github.com/Resembli/ui",
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
