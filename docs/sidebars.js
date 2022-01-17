// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    "introduction",
    {
      type: "category",
      label: "Le-Window",
      items: [
        "le-window/list",
        "le-window/list-horizontal",
        "le-window/grid",
        {
          type: "category",
          label: "Examples",
          collapsed: false,
          items: [
            "le-window/examples/fixed-size-list",
            "le-window/examples/variable-size-list",
            "le-window/examples/horizontally-fixed-size-list",
            "le-window/examples/horizontally-variable-size-list",
            "le-window/examples/fixed-size-grid",
            "le-window/examples/variable-size-grid",
          ],
        },
        "le-window/implementation",
      ],
      link: {
        type: "doc",
        id: "le-window/index",
      },
    },
  ],
}

module.exports = sidebars
