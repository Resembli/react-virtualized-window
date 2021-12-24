import type { CSSProperties } from "react"

import { List } from "@resembli/le-window"

const heights = [50, 75, 80, 90, undefined]

const listItems = Array(1000)
  .fill(0)
  .map((_, i) => {
    const a = Math.floor(Math.random() * heights.length)
    return { props: { index: i, styles: {} }, height: heights[a] }
  })

const RenderIndexCentered = (p: { index: number; styles: CSSProperties }) => {
  return (
    <div
      style={{
        ...p.styles,
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
    <div style={{ margin: 50, width: 800, height: 500 }}>
      <List rowHeight={20} data={listItems} ItemComponent={RenderIndexCentered} />
    </div>
  )
}
