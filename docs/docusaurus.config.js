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
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/Resembli/le-ui/edit/main/docs/",
        },
        theme: {
          customCss: require.resolve("./src/css/main.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig;} */
    {
      navbar: {
        title: "Le-UI",
        logo: {
          alt: "Resembli logo",
          src: "resembli-icon.svg",
        },
        items: [
          {
            type: "doc",
            docId: "introduction",
            position: "left",
            label: "Documentation",
          },
          { to: "/blog", label: "Blog", position: "right" },
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
