import { List } from "@resembli/react-virtualized-window"

import { css } from "../../theme/theme"

const data = Array(2000)
  .fill(0)
  .map((_, i) => i)

const heights = Array(2000)
  .fill(0)
  .map((_, i) => [40, 30, 100, 120, 50][i % 5])

const itemClass = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "$blue4",
  variants: {
    odd: {
      true: { backgroundColor: "$mint3", color: "$mint11" },
    },
  },
})

export function VariableListGapRTL() {
  return (
    <List data={data} defaultRowHeight={50} rowHeights={heights} rtl gap={20}>
      {(props, style) => {
        const clx = itemClass({ odd: props % 2 === 1 })
        return (
          <div style={style} className={clx}>
            {props}
          </div>
        )
      }}
    </List>
  )
}
