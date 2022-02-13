import { List } from "@resembli/react-virtualized-window"

import { css } from "../../theme/theme"

const data = Array(100)
  .fill(0)
  .map((_, i) => i)

const widths = Array(200)
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

export function HListPlayground() {
  return (
    <List data={data} defaultSize={100} gap={20} sizes={widths} layout="horizontal">
      {({ style, data }) => {
        const clx = itemClass({ odd: data % 2 === 1 })
        return (
          <div style={style} className={clx}>
            {data + 1}
          </div>
        )
      }}
    </List>
  )
}
