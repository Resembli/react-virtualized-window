import { css } from "@stitches/core"

const AppCss = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  background: "Beige",
})

const rowHeights = Array.from({ length: 1000 }, (_, i) => [20, 40, 20, 60][i % 4]).reduce(
  (acc, h, i) => {
    acc[i] = h

    return acc
  },
  {} as Record<number, number>,
)

console.log(rowHeights)
function App() {
  return <div className={AppCss()}></div>
}

export default App
