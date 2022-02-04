import { List } from "@resembli/react-virtualized-window"

import { css } from "../theme/theme"

const playgroundCss = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: 50,
  boxSizing: "border-box",
  border: "1px solid white",
})

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

const data = Array(2000)
  .fill(0)
  .map((_, i) => i)

export function Playground() {
  return (
    <div className={playgroundCss()}>
      <List data={data} defaultRowHeight={"12%"}>
        {(props, style) => {
          const clx = itemClass({ odd: props % 2 === 1 })
          return (
            <div style={style} className={clx}>
              {props + 1}
            </div>
          )
        }}
      </List>
    </div>
  )
}
