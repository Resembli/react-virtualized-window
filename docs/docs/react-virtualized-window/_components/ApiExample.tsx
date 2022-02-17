import { useColorMode } from "@docusaurus/theme-common"
import { useRef } from "react"

import type { RenderItem, VirtualWindowApi } from "@resembli/react-virtualized-window"
import { List } from "@resembli/react-virtualized-window"

const sampleData = Array.from({ length: 5000 }, (_, i) => i)

const Row: RenderItem<number> = ({ data, style }) => {
  const { isDarkTheme } = useColorMode()

  const darkRow = isDarkTheme ? "black" : "grey"
  const lightRow = isDarkTheme ? "grey" : "white"

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: data % 2 ? darkRow : lightRow,
        color: isDarkTheme ? "white" : "black",
        ...style,
      }}
    >
      {data}
    </div>
  )
}

export function BasicApiExample() {
  const apiRef = useRef<VirtualWindowApi>()

  return (
    <div>
      <div style={{ margin: 20 }}>
        <button
          className="button button--secondary"
          onClick={() => apiRef.current?.scrollBy({ top: 1000 })}
        >
          Scroll by 1000
        </button>
      </div>
      <div style={{ width: "100%", height: 400 }}>
        <List defaultSize={50} data={sampleData} apiRef={apiRef}>
          {Row}
        </List>
      </div>
    </div>
  )
}
