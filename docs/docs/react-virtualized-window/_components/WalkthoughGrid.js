import { Grid } from "@resembli/react-virtualized-window"

// Create a 1000x100 matrix
const dummyData = Array.from({ length: 1000 }, (_, row) =>
  Array.from({ length: 100 }, (_, column) => [row, column]),
)

function RenderItem(props) {
  const [row, column] = props.data // The piece of data for this item.
  const style = props.style // The CSSProperties we need to pass to our item

  return (
    <div
      style={{
        border: "1px solid gray",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      {row},{column}
    </div>
  )
}
export function MyGrid() {
  return (
    <div style={{ height: 400, width: 400 }}>
      <Grid defaultRowHeight={50} defaultColumnWidth={100} data={dummyData}>
        {RenderItem}
      </Grid>
    </div>
  )
}
