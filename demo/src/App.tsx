import type { CSSProperties } from "react"

import { ListHorizontal } from "@resembli/le-window"

const widths = [50, 75, 80, 90, undefined]

const listItems = Array(300)
  .fill(0)
  .map((_, i) => {
    const a = Math.floor(Math.random() * widths.length)
    return { props: { index: i, style: {} }, width: widths[a] }
  })

const RenderIndexCentered = (p: { index: number; style: CSSProperties }) => {
  return (
    <div
      style={{
        ...p.style,
        background: p.index % 2 === 0 ? "#f8f8f0" : "white",
        height: "100%",
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
    <div style={{ margin: 50, width: 1000, height: 150 }}>
      <ListHorizontal columnWidth={50} data={listItems} ItemComponent={RenderIndexCentered} />
    </div>
  )
}
