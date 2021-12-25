import type { GridDataRow } from "@resembli/le-window"
import { List } from "@resembli/le-window"
import { Grid } from "@resembli/le-window"

const h = [30, 40, 50, 60]

const gridData: GridDataRow<{ row: number; column: number }>[] = Array(1000)
  .fill(0)
  .map((_, row) => {
    const cells = Array(200)
      .fill(0)
      .map((_, column) => ({ props: { row, column } }))

    return { cells }
  })

const gridHeights = Array(1000)
  .fill(0)
  .map((_, i) => h[i % h.length])

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

const ListItem = ({ index }: { index: number }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        background: index % 2 === 1 ? "white" : "#f8f8f0",
      }}
    >
      {index}
    </div>
  )
}

const listData = Array(1000)
  .fill(0)
  .map((_, i) => ({ props: { index: i } }))

const listHeights = Array(1000)
  .fill(0)
  .map((_, i) => h[i % h.length])

export const App = () => {
  return (
    <>
      <div style={{ margin: 20, width: 500, height: 500, border: "1px solid black" }}>
        <Grid
          data={gridData}
          columnWidth={100}
          ItemComponent={Item}
          defaultRowHeight={50}
          rowHeights={gridHeights}
        />
      </div>
      <div style={{ margin: 20, width: 500, height: 500, border: "1px solid black" }}>
        <List
          ItemComponent={ListItem}
          data={listData}
          defaultRowHeight={50}
          rowHeights={listHeights}
        />
      </div>
    </>
  )
}
