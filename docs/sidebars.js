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
        "react-virtualized-window/api",
        {
          type: "category",
          label: "Recipes",
          collapsed: false,
          items: [
            "react-virtualized-window/recipes/infinite-scrolling",
            "react-virtualized-window/recipes/combo-box",
            "react-virtualized-window/recipes/chat-channel",
            "react-virtualized-window/recipes/virtualized-masonry",
          ],
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
