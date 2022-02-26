import { css } from "@stitches/core"
import { useState } from "react"

import { Grid } from "@resembli/react-virtualized-window"

const AppCss = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  background: "Beige",
})

const ItemCss = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "Azure",
  variants: {
    odd: {
      true: {
        background: "grey",
      },
    },
    pinned: {
      true: {
        background: "Bisque",
      },
    },
  },
})

const data = Array.from({ length: 1000 }, (_, row) => {
  return Array.from({ length: 100 }, (_, column) => {
    return [row, column]
  })
})

function App() {
  const [disableSticky, setStickyDisabled] = useState(false)

  return (
    <div className={AppCss()}>
      <div>
        <label>
          disableStick:
          <input
            type="checkbox"
            checked={disableSticky}
            onChange={(e) => setStickyDisabled(e.target.checked)}
          />
        </label>
      </div>
      <Grid
        defaultColumnWidth={100}
        defaultRowHeight={100}
        data={data}
        width="70%"
        height="70%"
        disableSticky={disableSticky}
      >
        {({ data, style, cellMeta }) => (
          <div
            style={style}
            className={ItemCss({
              odd: (data[0] + data[1]) % 2 === 1,
              pinned: !!cellMeta.pinnedRow || !!cellMeta.pinnedColumn,
            })}
          >
            {data[0]},{data[1]}
          </div>
        )}
      </Grid>
    </div>
  )
}

export default App
