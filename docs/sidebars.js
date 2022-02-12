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
          items: [
            "react-virtualized-window/recipes/infinite-scrolling",
            "react-virtualized-window/recipes/auto-complete-dropdown",
            "react-virtualized-window/recipes/chat-channel",
            "react-virtualized-window/recipes/grid-search",
            "react-virtualized-window/recipes/virtualized-masonry",
            "react-virtualized-window/recipes/keyboard-navigatable-grid",
            "react-virtualized-window/recipes/game-of-life",
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
