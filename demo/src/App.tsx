import type { GridDataRow } from "@resembli/le-window"
import { Grid, List, ListHorizontal } from "@resembli/le-window"

const h = [30, 40, 50, 60]

const widths = [80, 140, 120, 100]

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

const gridCellsWidths = Array(200)
  .fill(0)
  .map((_, i) => widths[i % widths.length])

const Item = ({ row, column }: { row: number; column: number }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        background: `linear-gradient(to right, ${getRandomHEXColor()}, ${getRandomHEXColor()}`,
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
        background: `linear-gradient(to right, ${getRandomHEXColor()}, ${getRandomHEXColor()}`,
      }}
    >
      {index}
    </div>
  )
}

function getRandomHEXColor() {
  const SEED = "0123456789abcdef"
  let output = "#"
  while (output.length < 7) {
    output += SEED[Math.floor(Math.random() * SEED.length)]
  }
  return output
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
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ display: "flex" }}>
          <div style={{ margin: 20, width: 1000, height: 500, border: "1px solid black" }}>
            <Grid
              data={gridData}
              defaultColumnWidth={100}
              ItemComponent={Item}
              defaultRowHeight={50}
              rowHeights={gridHeights}
              columnWidths={gridCellsWidths}
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
        </div>
        <div style={{ margin: 20, width: 1000, height: 500, border: "1px solid black" }}>
          <ListHorizontal
            ItemComponent={ListItem}
            data={listData}
            defaultColumnWidth={50}
            columnWidths={listHeights}
          />
        </div>
      </div>
    </>
  )
}
