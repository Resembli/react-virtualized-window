import type { CssComponent } from "@stitches/core/types/styled-component"

export { Collapse } from "./components/Collapse.js"
export type { CollapseProps } from "./components/Collapse.js"

export { TreeRoot } from "./components/Tree/TreeRoot.js"
export type { TreeRootProps } from "./components/Tree/TreeRoot.js"

export { TreeNode } from "./components/Tree/TreeNode.js"
export type { TreeNodeProps } from "./components/Tree/TreeNode.js"

export { Box } from "./components/Box.js"
export type { BoxProps } from "./components/Box.js"

// Styling and theming exports
export { VariantProvider } from "./providers/VariantProvider.js"
export * from "@stitches/core"
export type ExtractVariant<T> = T extends CssComponent<unknown, infer K> ? K : never
export type MakeComponentVariants<T extends { Box: unknown }> = {
  [k in keyof T]: ExtractVariant<T[k]>
}
