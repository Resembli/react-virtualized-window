// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    "introduction",
    {
      type: "category",
      label: "React Virtualized Window",
      items: [
        "react-virtualized-window/list",
        "react-virtualized-window/grid",
        {
          type: "category",
          label: "Recipes (WIP)",
          collapsed: false,
          items: ["react-virtualized-window/recipes/infinite-scrolling"],
        },
      ],
      link: {
        type: "doc",
        id: "react-virtualized-window/index",
      },
    },
  ],
}

module.exports = sidebars
