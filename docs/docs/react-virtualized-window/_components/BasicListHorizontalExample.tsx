import useThemeContext from "@theme/hooks/useThemeContext"

import type { RenderItem } from "@resembli/react-virtualized-window"
import { ListHorizontal } from "@resembli/react-virtualized-window"

const sampleData = Array.from({ length: 5000 }, (_, i) => i)

const Column: RenderItem<number> = ({ data, style }) => {
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

export function BasicListHorizontal() {
  const innerWidth = globalThis.innerWidth ?? 1280
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ListHorizontal defaultColumnWidth={50} data={sampleData} disableSticky={innerWidth < 800}>
        {Column}
      </ListHorizontal>
    </div>
  )
}
