import { Grid as WGrid } from "@resembli/react-virtualized-window"

const gridData = Array(1000)
  .fill(0)
  .map((_, row) => {
    const cells = Array(200)
      .fill(0)
      .map((_, column) => {
        return { row, column }
      })

    return { cells }
  })

function getRandomHEXColor() {
  const SEED = "0123456789abcdef"
  let output = "#"
  while (output.length < 7) {
    output += SEED[Math.floor(Math.random() * SEED.length)]
  }
  return output
}

export function Grid() {
  return (
    <WGrid data={gridData} defaultColumnWidth={100} defaultRowHeight={100}>
      {({ row, column }, styles) => {
        const startColor = getRandomHEXColor()
        const endColor = getRandomHEXColor()

        return (
          <div
            tabIndex={0}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              background: `linear-gradient(to right, ${startColor}, ${endColor}`,
              color: "black",
              ...styles,
              display: "inline-flex",
            }}
          >
            ({row}, {column})
          </div>
        )
      }}
    </WGrid>
  )
}
