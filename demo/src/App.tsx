import { Window } from "@resembli/le-window"

const listItems = Array(1000)
  .fill(0)
  .map((_, i) => ({ index: i }))

const colorPalette = ["#78184a", "#854a63", "#927b7b", "#a0ad94", "#addfad"]

const RenderIndexCentered = (p: { index: number }) => {
  return (
    <div
      style={{
        height: "100%",
        background: colorPalette[p.index % colorPalette.length],
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {p.index}
    </div>
  )
}

export const App = () => {
  return (
    <div style={{ width: 800, height: 800 }}>
      <Window rowHeight={20} data={listItems} ItemComponent={RenderIndexCentered} />
    </div>
  )
}
