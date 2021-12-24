import { Grid } from "@resembli/le-window"
import type { GridDataRow } from "@resembli/le-window/src/types"

const gridData: GridDataRow<{ row: number; column: number }>[] = Array(20)
  .fill(0)
  .map((_, row) => {
    const cells = Array(10)
      .fill(0)
      .map((_, column) => ({ props: { row, column } }))

    return { cells }
  })

export const App = () => {
  return (
    <div style={{ margin: 50, width: 800, height: 800 }}>
      <Grid data={gridData} rowHeight={50} columnWidth={100} />
    </div>
  )
}
