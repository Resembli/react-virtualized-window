import { List } from "@resembli/react-virtualized-window"

import { css } from "../../theme/theme"

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

const data = Array(100)
  .fill(0)
  .map((_, i) => i)

export function ListPlayground() {
  return (
    <List data={data} defaultRowHeight={50} gap={20}>
      {(props, style, { row }) => {
        const clx = itemClass({ odd: row % 2 === 1 })
        return (
          <div style={style} className={clx}>
            {props + 1}
          </div>
        )
      }}
    </List>
  )
}
