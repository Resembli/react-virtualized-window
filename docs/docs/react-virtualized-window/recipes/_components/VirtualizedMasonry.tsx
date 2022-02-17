import type { NumberOrPercent } from "@resembli/react-virtualized-window"
import { Grid } from "@resembli/react-virtualized-window"

const urls = [
  "/imgs/masonry-1.jpeg",
  "/imgs/masonry-2.jpeg",
  "/imgs/masonry-3.jpeg",
  "/imgs/masonry-4.jpeg",
  "/imgs/masonry-5.jpeg",
]

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

      return urls[randomInt % 5]
    }),
  )

  return (
    <div style={{ height: 500 }}>
      <Grid data={imgUrls} defaultColumnWidth={width as NumberOrPercent} defaultRowHeight={300}>
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
