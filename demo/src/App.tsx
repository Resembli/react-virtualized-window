import { Window } from "@resembli/le-window"

const listItems = Array(1000)
  .fill(0)
  .map((_, i) => ({ index: i }))

const RenderIndexCentered = (p: { index: number }) => {
  return (
    <div
      style={{
        height: "100%",
        background: p.index % 2 === 0 ? "#f8f8f0" : "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => console.log("I was clicked")}
    >
      {p.index}
    </div>
  )
}

export const App = () => {
  return (
    <div style={{ margin: 50, width: 800, height: 800 }}>
      <Window rowHeight={35} data={listItems} ItemComponent={RenderIndexCentered} />
    </div>
  )
}
