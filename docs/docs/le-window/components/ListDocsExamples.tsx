import { List } from "@resembli/le-window"

const ListItem = ({ index }: { index: number }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        background: index % 2 ? "grey" : "white",
        color: "black",
      }}
    >
      {index}
    </div>
  )
}

const listData = Array(1000)
  .fill(0)
  .map((_, i) => ({ index: i }))

const heights = [30, 40, 50, 60]

const listHeights = Array(1000)
  .fill(0)
  .map((_, i) => heights[i % heights.length])

export const FixedSizeDocsExample = () => {
  return (
    <div style={{ height: 500, border: "1px solid black" }}>
      <List ItemComponent={ListItem} data={listData} defaultRowHeight={50} />
    </div>
  )
}
