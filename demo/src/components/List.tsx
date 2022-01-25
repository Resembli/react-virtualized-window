import { List as WList } from "@resembli/react-virtualized-window"

function getRandomHEXColor() {
  const SEED = "0123456789abcdef"
  let output = "#"
  while (output.length < 7) {
    output += SEED[Math.floor(Math.random() * SEED.length)]
  }
  return output
}

const data = Array(1000)
  .fill(0)
  .map((_, i) => ({ index: i }))

const heights = Array(1000)
  .fill(0)
  .map((_, i) => [20, 100, 50, 150][i % 4])

export function List() {
  return (
    <WList data={data} defaultRowHeight={50} gap={20}>
      {(p, style) => {
        return (
          <div
            tabIndex={0}
            style={{
              backgroundColor: getRandomHEXColor(),
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bolder",
              ...style,
              display: "flex",
            }}
          >
            {p.index}
          </div>
        )
      }}
    </WList>
  )
}
