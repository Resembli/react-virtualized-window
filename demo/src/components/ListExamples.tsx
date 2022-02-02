import { List } from "@resembli/react-virtualized-window"
import type { ListProps } from "@resembli/react-virtualized-window"

import { css } from "../theme/theme"
import type { RouteItem } from "../types"

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

interface BaseListProps {
  rh?: ListProps<unknown>["rowHeights"]
  rtl?: boolean
  gap?: ListProps<unknown>["gap"]
  width?: ListProps<unknown>["width"]
  height?: ListProps<unknown>["height"]
  overscan?: ListProps<unknown>["overscan"]
}

function BaseNList({ rh, rtl, gap, overscan, width, height }: BaseListProps) {
  return (
    <List
      data={data}
      defaultRowHeight={50}
      rowHeights={rh}
      rtl={rtl}
      gap={gap}
      width={width}
      height={height}
      overscan={overscan}
    >
      {(props, style) => {
        const clx = itemClass({ odd: props % 2 === 1 })
        return (
          <div style={style} className={clx}>
            {props + 1}
          </div>
        )
      }}
    </List>
  )
}

const multiCss = css({
  display: "grid",
  gridTemplateColumns: "50% 50%",
  height: "100%",
  width: "100%",
})

const MultipleNList = () => {
  return (
    <div className={multiCss()}>
      <NList />
      <VarNList />
    </div>
  )
}

const NList = () => <BaseNList />
const ListRTL = () => <BaseNList rtl />
const ListGap = () => <BaseNList gap={20} />
const ListGapRTL = () => <BaseNList gap={20} rtl />
const ListWH = () => <BaseNList gap={20} width="50%" height="50%" />
const ListWHRTL = () => <BaseNList gap={20} rtl width="50%" height="50%" />
const ListOverscan = () => <BaseNList overscan={2} width="50%" height="500px" />
const ListOverscanRTL = () => <BaseNList rtl overscan={2} width="50%" height="50%" />

const VarNList = () => <BaseNList rh={heights} />
const VarNListRTL = () => <BaseNList rh={heights} rtl />
const VarNListGap = () => <BaseNList rh={heights} gap={20} />
const VarNListGapRTL = () => <BaseNList rh={heights} gap={20} rtl />

const NListVarGap = () => <BaseNList gap={{ horizontal: 10, vertical: 40 }} />
const NListVarGapRTL = () => <BaseNList gap={{ horizontal: 10, vertical: 40 }} rtl />
const VarNListVarGap = () => <BaseNList gap={{ horizontal: 10, vertical: 40 }} rh={heights} />
const VarNListVarGapRTL = () => (
  <BaseNList gap={{ horizontal: 10, vertical: 40 }} rh={heights} rtl />
)

export const listRoutes: RouteItem[] = [
  { label: "Basic", path: "/list", Component: NList },
  { label: "RTL", path: "/list-rtl", Component: ListRTL },
  { label: "Gap", path: "/list-gap", Component: ListGap },
  { label: "Gap RTL", path: "/list-gap-rtl", Component: ListGapRTL },
  { label: "WH", path: "/list-wh", Component: ListWH },
  { label: "WH RTL", path: "/list-wh-rtl", Component: ListWHRTL },
  { label: "Overscan", path: "/list-overscan", Component: ListOverscan },
  { label: "Overscan RTL", path: "/list-overscan-rtl", Component: ListOverscanRTL },

  { label: "Var Basic", path: "/list-var-basic", Component: VarNList },
  { label: "Var RTL", path: "/list-var-rtl", Component: VarNListRTL },
  { label: "Var Width Gap", path: "/list-var-width-gap", Component: VarNListGap },
  { label: "Var Width Gap RTL", path: "/list-var-width-gap-rtl", Component: VarNListGapRTL },

  { label: "Basic Var Gap", path: "/list-basic-var-gap", Component: NListVarGap },
  { label: "Var Gap RTL", path: "/list-var-gap-rtl", Component: NListVarGapRTL },
  { label: "Var Width Var Gap", path: "/list-var-width-var-gap", Component: VarNListVarGap },
  {
    label: "Var Width Var Gap RTL",
    path: "/list-var-width-var-gap-rtl",
    Component: VarNListVarGapRTL,
  },

  { label: "Multiple Lists", path: "/list-multiple", Component: MultipleNList },
]
