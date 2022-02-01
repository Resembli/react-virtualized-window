import { ListHorizontal } from "@resembli/react-virtualized-window"

import { css } from "../../theme/theme"

const data = Array(2000)
  .fill(0)
  .map((_, i) => i)

const widths = Array(2000)
  .fill(0)
  .map((_, i) => [50, 30, 100, 120, 60][i % 5])

const itemClass = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: "$blue4",
  variants: {
    odd: {
      true: { backgroundColor: "$mint3", color: "$mint11" },
    },
  },
})

export function VariableHorizontalList() {
  return (
    <ListHorizontal data={data} defaultColumnWidth={50} columnWidths={widths}>
      {(props, style) => {
        const clx = itemClass({ odd: props % 2 === 1 })
        return (
          <div style={style} className={clx}>
            {props}
          </div>
        )
      }}
    </ListHorizontal>
  )
}

export function VariableHorizontalListRTL() {
  return (
    <ListHorizontal data={data} defaultColumnWidth={50} rtl columnWidths={widths}>
      {(props, style) => {
        const clx = itemClass({ odd: props % 2 === 1 })
        return (
          <div style={style} className={clx}>
            {props}
          </div>
        )
      }}
    </ListHorizontal>
  )
}

export function VariableHorizontalListWithGap() {
  return (
    <ListHorizontal data={data} defaultColumnWidth={50} gap={20} columnWidths={widths}>
      {(props, style) => {
        const clx = itemClass({ odd: props % 2 === 1 })
        return (
          <div style={style} className={clx}>
            {props}
          </div>
        )
      }}
    </ListHorizontal>
  )
}

export function VariableHorizontalListWithGapRTL() {
  return (
    <ListHorizontal data={data} defaultColumnWidth={50} gap={20} rtl columnWidths={widths}>
      {(props, style) => {
        const clx = itemClass({ odd: props % 2 === 1 })
        return (
          <div style={style} className={clx}>
            {props}
          </div>
        )
      }}
    </ListHorizontal>
  )
}
