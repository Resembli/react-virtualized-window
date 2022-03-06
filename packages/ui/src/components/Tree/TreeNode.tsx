import * as React from "react"

import { useToggle } from "@resembli/hooks"

import { css } from "../../css/css.js"
import { Collapse } from "../Collapse.js"
import { useTreeContext } from "./TreeRoot.js"

const NodeCss = css({
  margin: 0,
  padding: 0,
  cursor: "pointer",
  userSelect: "none",
})

const NodeItemCss = css({
  "&:hover": {
    background: "AliceBlue",
  },
})

const NodeContainerCss = css({
  margin: 0,
  padding: 0,
  listStyle: "none",
})

export interface TreeNodeProps {
  item: React.ReactNode
}

interface InternalTreeProps extends TreeNodeProps {
  __depth: number
}

export function TreeNode({ children, ...props }: React.PropsWithChildren<TreeNodeProps>) {
  const [open, toggleOpen] = useToggle()

  const { item, __depth = 0 } = props as InternalTreeProps

  const { indentSize } = useTreeContext()

  // Add the internal depth property to the elements. We either expect an array or a single
  // item. Note the user should be using TreeNode component, if they've provided other types
  // of React components, we don't do anything, but will render them as normal.
  let childElements
  if (Array.isArray(children)) {
    childElements = children.map((child) => {
      if ((child as JSX.Element)?.type?.name === "TreeNode") {
        return React.cloneElement(child as JSX.Element, { __depth: __depth + 1 })
      }
      return child
    })
  } else {
    if ((children as JSX.Element)?.type?.name === "TreeNode") {
      childElements = React.cloneElement(children as JSX.Element, { __depth: __depth + 1 })
    }
  }

  const indentValue =
    typeof indentSize === "number" ? indentSize * __depth : `calc(${indentSize} * ${__depth})`

  return (
    <li className={NodeCss()}>
      <div
        onClick={toggleOpen}
        className={NodeItemCss({ css: { paddingLeft: __depth && indentValue } })}
      >
        {item}
      </div>
      {childElements && (
        <Collapse as="ul" open={open} className={NodeContainerCss()}>
          {childElements}
        </Collapse>
      )}
    </li>
  )
}
