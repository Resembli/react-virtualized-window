import { ListHorizontal } from "@resembli/react-virtualized-window"
import type { ListHorizontalProps } from "@resembli/react-virtualized-window"

import { css } from "../theme/theme"
import type { RouteItem } from "../types"

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

interface BaseHListProps {
  cw?: ListHorizontalProps<unknown>["columnWidths"]
  gap?: ListHorizontalProps<unknown>["gap"]
  rtl?: boolean
}

function BaseHList({ cw, rtl }: BaseHListProps) {
  return (
    <ListHorizontal data={data} defaultColumnWidth={50} columnWidths={cw} rtl={rtl}>
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

const multiCss = css({
  display: "grid",
  gridTemplateColumns: "50% 50%",
  height: "100%",
})

const MultipleHList = () => {
  return (
    <div className={multiCss()}>
      <HList />
      <VarHList />
    </div>
  )
}

const HList = () => <BaseHList />
const ListRTL = () => <BaseHList rtl />
const ListGap = () => <BaseHList gap={20} />
const ListGapRTL = () => <BaseHList gap={20} rtl />

const VarHList = () => <BaseHList cw={widths} />
const VarHListRTL = () => <BaseHList cw={widths} rtl />
const VarHListGap = () => <BaseHList cw={widths} gap={20} />
const VarHListGapRTL = () => <BaseHList cw={widths} gap={20} rtl />

const HListVarGap = () => <BaseHList gap={{ horizontal: 40, vertical: 10 }} />
const HListVarGapRTL = () => <BaseHList gap={{ horizontal: 40, vertical: 10 }} rtl />
const VarHListVarGap = () => <BaseHList gap={{ horizontal: 40, vertical: 10 }} cw={widths} />
const VarHListVarGapRTL = () => <BaseHList gap={{ horizontal: 40, vertical: 10 }} cw={widths} rtl />

export const hListRoutes: RouteItem[] = [
  { label: "Basic", path: "/h-list", Component: HList },
  { label: "RTL", path: "/h-list-rtl", Component: ListRTL },
  { label: "Gap", path: "/h-list-gap", Component: ListGap },
  { label: "Gap RTL", path: "/h-list-gap-rtl", Component: ListGapRTL },

  { label: "Var Basic", path: "/h-list-var-basic", Component: VarHList },
  { label: "Var RTL", path: "/h-list-var-rtl", Component: VarHListRTL },
  { label: "Var Width Gap", path: "/h-list-var-width-gap", Component: VarHListGap },
  { label: "Var Width Gap RTL", path: "/h-list-var-width-gap-rtl", Component: VarHListGapRTL },

  { label: "Basic Var Gap", path: "/h-list-basic-var-gap", Component: HListVarGap },
  { label: "Var Gap RTL", path: "/h-list-var-gap-rtl", Component: HListVarGapRTL },
  { label: "Var Width Var Gap", path: "/h-list-var-width-var-gap", Component: VarHListVarGap },
  {
    label: "Var Width Var Gap RTL",
    path: "/h-list-var-width-var-gap-rtl",
    Component: VarHListVarGapRTL,
  },

  { label: "Multiple H Lists", path: "/h-list-multipl", Component: MultipleHList },
]
