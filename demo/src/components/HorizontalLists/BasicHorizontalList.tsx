import { ListHorizontal } from "@resembli/react-virtualized-window"

import { css } from "../../theme/theme"

const data = Array(2000)
  .fill(0)
  .map((_, i) => i)

const itemClass = css({
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  variants: {
    odd: {
      true: { backgroundColor: "$mint3", color: "$mint11" },
    },
  },
})

export function BasicHorizontalList() {
  return (
    <div style={{ width: "500px", height: "500px" }}>
      <ListHorizontal data={data} defaultColumnWidth={50}>
        {(props, style) => {
          const clx = itemClass({ odd: props % 2 === 1 })
          return (
            <div style={{ ...style, display: "inline-flex" }} className={clx}>
              {props}
            </div>
          )
        }}
      </ListHorizontal>
    </div>
  )
}
