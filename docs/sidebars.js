// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    "introduction",
    {
      type: "category",
      label: "Le-Window",
      items: [
        {
          type: "category",
          label: "List",
          items: ["le-window/examples/fixed-size-list", "le-window/examples/variable-size-list"],
          link: { type: "doc", id: "le-window/list" },
        },
        {
          type: "category",
          label: "ListHorizontal",
          items: [
            "le-window/examples/horizontally-fixed-size-list",
            "le-window/examples/horizontally-variable-size-list",
          ],
          link: { type: "doc", id: "le-window/list-horizontal" },
        },
        {
          type: "category",
          label: "Grid",
          link: { type: "doc", id: "le-window/grid" },
          items: ["le-window/examples/fixed-size-grid", "le-window/examples/variable-size-grid"],
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
