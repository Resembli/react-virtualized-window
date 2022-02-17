import { useColorMode } from "@docusaurus/theme-common"

import type { RenderItem } from "@resembli/react-virtualized-window"
import { Grid } from "@resembli/react-virtualized-window"

const data = Array(2000)
  .fill(0)
  .map((_, i) => {
    return Array(200)
      .fill(0)
      .map((_, j) => [i, j])
  })

const CellItem: RenderItem<number[]> = ({ style, data: [row, column] }) => {
  const { isDarkTheme } = useColorMode()

  const darkCell = isDarkTheme ? "black" : "grey"
  const lightCell = isDarkTheme ? "grey" : "white"

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: (row + column) % 2 === 1 ? darkCell : lightCell,
        ...style,
      }}
    >
      {row},{column}
    </div>
  )
}

export function BasicGridExample() {
  return (
    <div style={{ width: "100%", height: 500 }}>
      <Grid data={data} defaultColumnWidth={100} defaultRowHeight={100}>
        {CellItem}
      </Grid>
    </div>
  )
}
