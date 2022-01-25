import { ListHorizontal as WList } from "@resembli/react-virtualized-window"

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

const widths = Array(1000)
  .fill(0)
  .map((_, i) => [100, 150, 200, 50][i % 4])

export function ListHorizontal() {
  return (
    <WList data={data} defaultColumnWidth={100} gap={20} columnWidths={widths}>
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
