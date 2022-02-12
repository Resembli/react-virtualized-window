import useThemeContext from "@theme/hooks/useThemeContext"

import type { RenderItem } from "@resembli/react-virtualized-window"
import { List } from "@resembli/react-virtualized-window"

const sampleData = Array.from({ length: 5000 }, (_, i) => i)

const w = typeof window === undefined ? { innerWidth: 1280 } : window

const Row: RenderItem<number> = ({ data, style }) => {
  const { isDarkTheme } = useThemeContext()

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
  const innerWidth = w.innerWidth
  return (
    <div style={{ width: "100%", height: 400 }}>
      <List defaultRowHeight={50} data={sampleData} disableSticky={innerWidth < 800}>
        {Row}
      </List>
    </div>
  )
}
