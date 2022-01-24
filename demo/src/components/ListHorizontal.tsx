import { ListHorizontal as WList } from "@resembli/le-window"

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

export function ListHorizontal() {
  return (
    <WList data={data} defaultColumnWidth={100}>
      {(p, style) => {
        return (
          <div
            style={{
              backgroundColor: getRandomHEXColor(),
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bolder",
              ...style,
              display: "inline-flex",
            }}
          >
            {p.index}
          </div>
        )
      }}
    </WList>
  )
}
