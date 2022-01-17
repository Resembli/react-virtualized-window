import { List } from "@resembli/le-window"

const h = [30, 40, 50, 60]

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
  .map((_, i) => ({ index: i }))

const listHeights = Array(1000)
  .fill(0)
  .map((_, i) => h[i % h.length])

export const App = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ margin: 20, width: 1000, height: 600, border: "1px solid black" }}>
          <List data={listData} defaultRowHeight={50} rowHeights={listHeights}>
            {(props, style) => {
              return (
                <div
                  style={{
                    background: `linear-gradient(to right, ${getRandomHEXColor()}, ${getRandomHEXColor()}`,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    ...style,
                  }}
                >
                  {props.index}
                </div>
              )
            }}
          </List>
        </div>
      </div>
    </>
  )
}
