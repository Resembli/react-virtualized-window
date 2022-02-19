import { css } from "@stitches/core"
import type { PageMeta } from "@vitebook/client"
import { Variant } from "@vitebook/preact"
import { ControlsAddon } from "@vitebook/preact/addons"
import { useState } from "react"

import { Grid } from "@resembli/react-virtualized-window"

export const __pageMeta: PageMeta = {
  title: "Grid",
  description: "Grid Playground",
}

const data = Array.from({ length: 1000 }, (_, row) => {
  return Array.from({ length: 100 }, (_, column) => {
    return [row, column]
  })
})

const itemClass = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "black",
  variants: {
    odd: {
      true: {
        backgroundColor: "darkblue",
      },
    },
  },
})

function GridPlayground() {
  const [gap, setGap] = useState(10)

  return (
    <>
      <Variant name="Default" description="Default Grid">
        <Grid
          rtl
          data={data}
          defaultRowHeight={100}
          defaultColumnWidth={100}
          gap={gap}
          style={{ background: "red" }}
        >
          {({ data, style }) => (
            <div style={style} className={itemClass({ odd: (data[0] + data[1]) % 2 === 1 })}>
              {data[0]},{data[1]}
            </div>
          )}
        </Grid>
      </Variant>
      <Variant name="Half W/H" description="Half width and height">
        <Grid
          data={data}
          defaultRowHeight={50}
          defaultColumnWidth={50}
          width="50%"
          height="50%"
          gap={gap}
        >
          {({ data, style }) => (
            <div style={style} className={itemClass({ odd: (data[0] + data[1]) % 2 === 1 })}>
              {data[0]},{data[1]}
            </div>
          )}
        </Grid>
      </Variant>

      <ControlsAddon>
        <label>
          Gap
          <input
            type="number"
            title="Gap"
            onChange={(e) => setGap(Number.parseInt(e.target.value))}
            value={gap}
          />
        </label>
      </ControlsAddon>
    </>
  )
}

GridPlayground.displayName = "GridPlayground"

export default GridPlayground
