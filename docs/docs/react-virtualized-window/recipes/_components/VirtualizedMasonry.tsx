import type { NumberOrPercent } from "@resembli/react-virtualized-window"
import { Grid } from "@resembli/react-virtualized-window"

const heights = [200, 300, 150, 100]

export function VirtualizedMasonry() {
  const innerWidth = globalThis.innerWidth ?? 1280

  let itemCount = 5
  if (innerWidth < 800) itemCount = 3
  if (innerWidth < 500) itemCount = 2

  let width = "20%"
  if (innerWidth < 800) width = "33%"
  if (innerWidth < 500) width = "50%"

  const imgUrls = Array.from({ length: 100 }, () =>
    Array.from({ length: itemCount }, () => {
      const randomInt = Math.floor(Math.random() * 100)
      return `https://picsum.photos/250/${heights[randomInt % 4]}`
    }),
  )

  return (
    <div style={{ height: 500 }}>
      <Grid data={imgUrls} defaultColumnWidth={width as NumberOrPercent} defaultRowHeight={200}>
        {({ data: url, style }) => {
          return (
            <div
              style={{
                padding: 10,
                ...style,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={url} alt="Random image from picsum" />
            </div>
          )
        }}
      </Grid>
    </div>
  )
}
