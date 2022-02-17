import { useColorMode } from "@docusaurus/theme-common"

import type { RenderItem } from "@resembli/react-virtualized-window"
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

export function BasicListExample() {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <List defaultSize={50} data={sampleData}>
        {Row}
      </List>
    </div>
  )
}
