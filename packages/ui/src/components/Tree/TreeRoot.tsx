import * as React from "react"

import { css } from "../../css/css.js"

const TreeRootCss = css({
  margin: 0,
  padding: 0,
  listStyle: "none",
})

const DEFAULT_INDENT_SIZE = "1rem"

interface TreeContextValue {
  indentSize: React.CSSProperties["marginLeft"]
}

const TreeContext = React.createContext<TreeContextValue>({ indentSize: DEFAULT_INDENT_SIZE })
export function useTreeContext() {
  return React.useContext(TreeContext)
}

export interface TreeRootProps {
  indent?: TreeContextValue["indentSize"]
}

export function TreeRoot({ children, indent }: React.PropsWithChildren<TreeRootProps>) {
  return (
    <TreeContext.Provider value={{ indentSize: indent ?? DEFAULT_INDENT_SIZE }}>
      <ul className={TreeRootCss()}>{children}</ul>
    </TreeContext.Provider>
  )
}
