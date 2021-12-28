// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    "introduction",
    {
      type: "category",
      label: "Le-Window",
      items: ["le-window/le-window-getting-started"],
      link: {
        type: "doc",
        id: "le-window/index",
      },
    },
  ],
}

module.exports = sidebars
