import { List } from "@resembli/react-virtualized-window"

import { css } from "../../theme/theme"

const data = Array(2000)
  .fill(0)
  .map((_, i) => i)

const itemClass = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  variants: {
    odd: {
      true: { backgroundColor: "$mint3", color: "$mint11" },
    },
  },
})

export function BasicList() {
  return (
    <div style={{ height: "100%" }}>
      <List data={data} defaultRowHeight={50}>
        {(props, style) => {
          const clx = itemClass({ odd: props % 2 === 1 })
          return (
            <div style={style} className={clx}>
              {props}
            </div>
          )
        }}
      </List>
    </div>
  )
}
