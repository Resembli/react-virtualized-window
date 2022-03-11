import type { CssComponent } from "@stitches/core/types/styled-component"

export { Collapse } from "./components/Collapse.js"
export type { CollapseProps } from "./components/Collapse.js"

export { TreeRoot } from "./components/Tree/TreeRoot.js"
export type { TreeRootProps } from "./components/Tree/TreeRoot.js"

export { TreeNode } from "./components/Tree/TreeNode.js"
export type { TreeNodeProps } from "./components/Tree/TreeNode.js"

export { Box } from "./components/Box.js"
export type { BoxProps } from "./components/Box.js"

export { Flex } from "./components/Flex.js"
export type { FlexProps } from "./components/Flex"

export { css, keyframes } from "./css/css"

export type ExtractVariant<T> = T extends CssComponent<unknown, infer K> ? K : never
