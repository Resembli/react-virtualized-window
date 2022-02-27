import { css } from "@stitches/core"
import { useMemo, useState } from "react"

import { VirtualTable } from "@resembli/virtual-table"

const AppCss = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  background: "Beige",
})

const names = ["Lee", "Bob", "Aya", "Sam"]

const generateData = () => {
  return Array.from({ length: 100 }, (_, i) => {
    const wins = Math.ceil(Math.random() * 20)
    const draws = Math.ceil(Math.random() * 20)
    const losses = Math.ceil(Math.random() * 20)
    const total = wins + losses + draws

    return [i, names[i % 4], wins, draws, losses, total]
  })
}

const WINDOW_HEIGHT = 480
const ITEM_HEIGHT = 20

function App() {
  const data = useMemo(() => generateData(), [])

  const [topOffset, setTopOffset] = useState(0)

  const totalHeight = ITEM_HEIGHT * data.length
  const startIndex = Math.floor(topOffset / ITEM_HEIGHT)
  const endIndex = WINDOW_HEIGHT / ITEM_HEIGHT + startIndex + 1

  const runningHeight = startIndex * ITEM_HEIGHT
  const remainingHeight = totalHeight - runningHeight - WINDOW_HEIGHT

  return (
    <div className={AppCss()}>
      <code>
        Top Offset: {topOffset}. Start Index: {startIndex}. End Index: {endIndex}.
      </code>

      <table
        className="table"
        cellSpacing={0}
        onScroll={(e) => {
          setTopOffset(e.currentTarget.scrollTop)
        }}
      >
        <thead className="thead">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Wins</th>
            <th>Draws</th>
            <th>Losses</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ height: runningHeight }} />
          {data.slice(startIndex, endIndex).map((row, i) => {
            return (
              <tr key={`${row[0]}-${i + startIndex}`} className="tr">
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
                <td>{row[4]}</td>
                <td>{row[5]}</td>
              </tr>
            )
          })}
          <tr style={{ height: remainingHeight }} />
        </tbody>
      </table>
    </div>
  )
}

export default App
