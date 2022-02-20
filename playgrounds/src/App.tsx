import { css } from "@stitches/core"

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
  },
})

const data = Array.from({ length: 1000 }, (_, row) => {
  return Array.from({ length: 100 }, (_, column) => {
    return [row, column]
  })
})

const pinnedLeft = [
  Array.from({ length: 1000 }, (_, row) => [-1, row]),
  Array.from({ length: 1000 }, (_, row) => [-1, row]),
]

function App() {
  return (
    <div className={AppCss()}>
      <Grid
        defaultColumnWidth={100}
        defaultRowHeight={100}
        data={data}
        width="70%"
        height="70%"
        pinnedLeft={pinnedLeft}
      >
        {({ data, style }) => (
          <div style={style} className={ItemCss({ odd: (data[0] + data[1]) % 2 === 1 })}>
            {data[0]},{data[1]}
          </div>
        )}
      </Grid>
    </div>
  )
}

export default App
