// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    "introduction",
    {
      type: "category",
      label: "React Virtualized Window",
      items: [
        {
          type: "category",
          label: "List",
          items: [
            "react-virtualized-window/examples/fixed-size-list",
            "react-virtualized-window/examples/variable-size-list",
          ],
          link: { type: "doc", id: "react-virtualized-window/list" },
        },
        {
          type: "category",
          label: "ListHorizontal",
          items: [
            "react-virtualized-window/examples/horizontally-fixed-size-list",
            "react-virtualized-window/examples/horizontally-variable-size-list",
          ],
          link: { type: "doc", id: "react-virtualized-window/list-horizontal" },
        },
        {
          type: "category",
          label: "Grid",
          link: { type: "doc", id: "react-virtualized-window/grid" },
          items: [
            "react-virtualized-window/examples/fixed-size-grid",
            "react-virtualized-window/examples/variable-size-grid",
          ],
        },
        "react-virtualized-window/implementation",
      ],
      link: {
        type: "doc",
        id: "react-virtualized-window/index",
      },
    },
  ],
}

module.exports = sidebars
