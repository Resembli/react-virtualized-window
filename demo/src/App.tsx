import { Grid } from "@resembli/le-window"
import type { GridDataRow } from "@resembli/le-window/src/types"

const h = [30, 40, 50, 60]

const gridData: GridDataRow<{ row: number; column: number }>[] = Array(1000)
  .fill(0)
  .map((_, row) => {
    const cells = Array(200)
      .fill(0)
      .map((_, column) => ({ props: { row, column } }))

    return { cells, height: h[row % h.length] }
  })

const Item = ({ row, column }: { row: number; column: number }) => {
  const light = row % 2 === 1 ? "white" : "#f8f8f0"
  const dark = row % 2 === 1 ? "#f8f8f0" : "white"

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        background: column % 2 === 1 ? dark : light,
      }}
    >
      {row}, {column}
    </div>
  )
}

export const App = () => {
  return (
    <div style={{ width: 1000, height: 1000 }}>
      <Grid data={gridData} rowHeight={50} columnWidth={100} ItemComponent={Item} />
    </div>
  )
}
