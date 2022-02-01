import type { GridProps } from "@resembli/react-virtualized-window"
import { Grid } from "@resembli/react-virtualized-window"

import { css } from "../theme/theme"
import type { RouteItem } from "../types"

const data = Array(1000)
  .fill(0)
  .map((_, i) => {
    return {
      cells: Array(200)
        .fill(0)
        .map((_, j) => [i, j]),
    }
  })

const heights = Array(1000)
  .fill(0)
  .map((_, i) => [40, 30, 100, 120, 50][i % 5])

const widths = Array(200)
  .fill(0)
  .map((_, i) => [50, 30, 100, 120, 60][i % 5])

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

interface BaseGridProps {
  cw?: GridProps<unknown>["columnWidths"]
  rh?: GridProps<unknown>["rowHeights"]
  gap?: GridProps<unknown>["gap"]
  rtl?: boolean
}

function BaseGrid({ cw, rh, rtl, gap }: BaseGridProps) {
  return (
    <Grid
      data={data}
      defaultColumnWidth={100}
      defaultRowHeight={100}
      columnWidths={cw}
      rowHeights={rh}
      gap={gap}
      rtl={rtl}
    >
      {([row, column], styles) => {
        return (
          <div style={{ ...styles }} className={itemClass({ odd: (row + column) % 2 === 1 })}>
            {row},{column}
          </div>
        )
      }}
    </Grid>
  )
}

const BGrid = () => <BaseGrid />
const GridRTL = () => <BaseGrid rtl />
const GridGap = () => <BaseGrid gap={20} />
const GridGapRTL = () => <BaseGrid rtl gap={20} />

const VGrid = () => <BaseGrid cw={widths} rh={heights} />
const VGridRTL = () => <BaseGrid cw={widths} rh={heights} rtl />
const VGridGap = () => <BaseGrid cw={widths} rh={heights} rtl gap={20} />
const VGridGapRTL = () => <BaseGrid cw={widths} rh={heights} rtl gap={20} />

const GridVGap = () => <BaseGrid gap={{ horizontal: 40, vertical: 10 }} />
const GridVGapRTL = () => <BaseGrid gap={{ horizontal: 40, vertical: 10 }} rtl />
const VGridVGap = () => <BaseGrid gap={{ horizontal: 40, vertical: 10 }} cw={widths} rh={heights} />
const VGridVGapRTL = () => (
  <BaseGrid gap={{ horizontal: 40, vertical: 10 }} rtl cw={widths} rh={heights} />
)

export const gridRoutes: RouteItem[] = [
  { label: "Grid", path: "/grid", Component: BGrid },
  { label: "RTL", path: "/grid-rtl", Component: GridRTL },
  { label: "Gap", path: "/grid-gap", Component: GridGap },
  { label: "Gap RTL", path: "/grid-gap-rtl", Component: GridGapRTL },

  { label: "Var Grid", path: "/vgrid", Component: VGrid },
  { label: "Var Grid RTL", path: "/vgrid-rtl", Component: VGridRTL },
  { label: "Var Grid Gap", path: "/vgrid-gap", Component: VGridGap },
  { label: "Var Grid Gap RTL", path: "/vgrid-gap-rtl", Component: VGridGapRTL },

  { label: "Var Gap", path: "/grid-v-gap", Component: GridVGap },
  { label: "Var Gap RTL", path: "/grid-v-gap-rtl", Component: GridVGapRTL },
  { label: "Var Grid Var Gap", path: "/v-grid-v-gap", Component: VGridVGap },
  { label: "Var Grid Var Gap RTL", path: "/v-grid-v-gap-rtl", Component: VGridVGapRTL },
]
