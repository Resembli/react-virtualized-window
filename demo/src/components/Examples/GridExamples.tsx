import { useCallback, useRef, useState } from "react"

import type { GridProps, VirtualWindowApi } from "@resembli/react-virtualized-window"
import { Grid } from "@resembli/react-virtualized-window"

import { css } from "../../theme/theme"
import type { RouteItem } from "../../types"

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

type BaseGridProps = Omit<
  GridProps<unknown>,
  "data" | "defaultColumnWidth" | "defaultRowHeight" | "columnWidths" | "rowHeights" | "children"
> & {
  cw?: GridProps<unknown>["columnWidths"]
  rh?: GridProps<unknown>["rowHeights"]
  defaultColumnWidth?: GridProps<unknown>["defaultColumnWidth"]
  defaultRowHeight?: GridProps<unknown>["defaultRowHeight"]
}

export function BaseGrid({
  cw,
  rh,
  defaultColumnWidth = 100,
  defaultRowHeight = 100,
  ...otherProps
}: BaseGridProps) {
  return (
    <Grid
      data={data}
      defaultColumnWidth={defaultColumnWidth}
      defaultRowHeight={defaultRowHeight}
      columnWidths={cw}
      rowHeights={rh}
      {...otherProps}
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

const OverscanBasic = () => <BaseGrid overscan={5} width="50%" height="50%" />
const OverscanRTL = () => <BaseGrid overscan={5} rtl width="50%" height="50%" />
const OverscanGap = () => <BaseGrid overscan={5} gap={20} width="50%" height="50%" />
const OverscanVariable = () => (
  <BaseGrid overscan={5} cw={widths} rh={heights} width="50%" height="50%" />
)
const OverscanVariableGap = () => (
  <BaseGrid overscan={5} cw={widths} rh={heights} gap={20} width="50%" height="50%" />
)

export const basicGrids: RouteItem[] = [
  { label: "Grid", path: "/grid", Component: BGrid },
  { label: "RTL", path: "/grid-rtl", Component: GridRTL },
  { label: "Var Grid", path: "/vgrid", Component: VGrid },
  { label: "Var Grid RTL", path: "/vgrid-rtl", Component: VGridRTL },
]

export const gapGrids: RouteItem[] = [
  { label: "Gap", path: "/grid-gap", Component: GridGap },
  { label: "Gap RTL", path: "/grid-gap-rtl", Component: GridGapRTL },
  { label: "Var WH Grid Gap", path: "/vgrid-gap", Component: VGridGap },
  { label: "Var WH Grid Gap RTL", path: "/vgrid-gap-rtl", Component: VGridGapRTL },
  { label: "Var Gap", path: "/grid-v-gap", Component: GridVGap },
  { label: "Var Gap RTL", path: "/grid-v-gap-rtl", Component: GridVGapRTL },
  { label: "Var WH Grid Var Gap", path: "/v-grid-v-gap", Component: VGridVGap },
  { label: "Var WH Grid Var Gap RTL", path: "/v-grid-v-gap-rtl", Component: VGridVGapRTL },
]

export const overscanGrids: RouteItem[] = [
  { label: "Overscan", path: "/grid-overscan", Component: OverscanBasic },
  { label: "Overscan RTL", path: "/grid-overscan-rtl", Component: OverscanRTL },
  { label: "Overscan Gap", path: "/grid-overscan-gap", Component: OverscanGap },
  { label: "Overscan Variable", path: "/grid-overscan-variable", Component: OverscanVariable },
  {
    label: "Overscan Variable Gap",
    path: "/grid-overscan-variable-gap",
    Component: OverscanVariableGap,
  },
]

const multiCss = css({
  display: "grid",
  gridTemplateColumns: "50% 50%",
  height: "100%",
  width: "100%",
})

const MultipleGrids = () => {
  return (
    <div className={multiCss()}>
      <BaseGrid />
      <VGrid />
    </div>
  )
}

export const multipleGrids: RouteItem[] = [
  { label: "Multiple Grids", path: "/grid-multiple", Component: MultipleGrids },
]

const sizingCss = css({
  width: "50%",
  height: "50%",

  variants: {
    grow: {
      true: { width: "80%", height: "80%" },
    },
    transition: {
      true: { transition: "width 1s ease-in, height 1s ease-in" },
    },
  },
})

const BaseSizing = ({
  gap,
  transitions,
  rtl,
}: {
  gap?: number
  transitions?: boolean
  rtl?: boolean
}) => {
  const [toggleSize, setToggle] = useState(false)

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div>
        <button onClick={() => setToggle(!toggleSize)}>Toggle Size</button>
      </div>
      <div className={sizingCss({ grow: toggleSize, transition: transitions })}>
        <BaseGrid gap={gap} rtl={rtl} />
      </div>
    </div>
  )
}

const SizingGrid = () => <BaseSizing />
const SizingGridGap = () => <BaseSizing gap={20} />
const SizingGridTransitions = () => <BaseSizing gap={20} transitions />
const SizingGridRTL = () => <BaseSizing gap={20} transitions rtl />

export const sizingGrids: RouteItem[] = [
  { label: "Sizing Grid", path: "/grid-sizing", Component: SizingGrid },
  { label: "Gap", path: "/grid-sizing-gap", Component: SizingGridGap },
  { label: "Transitions", path: "/grid-sizing-trans", Component: SizingGridTransitions },
  { label: "RTL", path: "/grid-sizing-rtl", Component: SizingGridRTL },
]

const customStyle = css({
  border: "20px solid blue",
  margin: 20,
})

const style = {
  border: "20px solid red",
  margin: 20,
}

const ClassNameGrid = () => <BaseGrid className={customStyle()} width="50%" height="50%" />
const StyleGrid = () => <BaseGrid style={style} width="50%" height="50%" />

export const stylingGrids: RouteItem[] = [
  { label: "Class Name Grid", path: "/grid-classname", Component: ClassNameGrid },
  { label: "Style Grid", path: "/grid-style", Component: StyleGrid },
]

const OnScroll = () => {
  const [offsetTop, setOffsetTop] = useState(0)
  const [offsetLeft, setOffsetLeft] = useState(0)

  return (
    <div>
      <div>
        <h3>Offset Top: {offsetTop}</h3>
        <h3>Offset Left: {offsetLeft}</h3>
      </div>
      <div style={{ height: 200, width: 500 }}>
        <BaseGrid
          onScroll={(e) => {
            setOffsetTop(e.currentTarget.scrollTop)
            setOffsetLeft(e.currentTarget.scrollLeft)
          }}
        />
      </div>
    </div>
  )
}

const Api = () => {
  const apiRef = useRef<VirtualWindowApi>()

  const handleTopScrollBy1000 = () => {
    if (!apiRef.current) return

    apiRef.current.scrollBy({ top: 1000 })
  }
  const handleLeftScrollBy1000 = () => {
    if (!apiRef.current) return

    apiRef.current.scrollBy({ left: 1000 })
  }

  const handleToTop = () => {
    if (!apiRef.current) return

    apiRef.current.scrollTo({ top: 0 })
  }

  const handleToLeft = () => {
    if (!apiRef.current) return

    apiRef.current.scrollTo({ left: 0 })
  }

  return (
    <div>
      <div>
        <h3>Api Controls</h3>
        <button onClick={handleTopScrollBy1000}>Scroll By Top 1,000</button>
        <button onClick={handleLeftScrollBy1000}>Scroll By Left 1,000</button>
        <button onClick={handleToTop}>Scroll To Top</button>
        <button onClick={handleToLeft}>Scroll To Left</button>
      </div>
      <div style={{ height: 200, width: 500 }}>
        <BaseGrid apiRef={apiRef} />
      </div>
    </div>
  )
}

const TabIndex = () => <BaseGrid tabIndex={0} />

export const onScrollApiTabIndexGrids: RouteItem[] = [
  { label: "On Scroll", path: "/grid-on-scroll", Component: OnScroll },
  { label: "Api", path: "/grid-api", Component: Api },
  { label: "Tab Index", path: "/grid-index", Component: TabIndex },
]

function debounce(method: { (): void; _tId?: ReturnType<typeof setTimeout> }, delay: number) {
  method._tId && clearTimeout(method._tId)
  method._tId = setTimeout(function () {
    method()
  }, delay)
}

const createData = () =>
  Array(50)
    .fill(0)
    .map(() => ({ cells: Array(20).fill(0) }))

const InfiniteScrolling = () => {
  const [data, setData] = useState(createData())

  const updateData = useCallback(() => setData((prev) => [...prev, ...createData()]), [])
  const updateWidths = useCallback(() => {
    setData((prev) => {
      const newData = prev.map((row) => {
        const newCells = Array(row.cells.length + 20).fill(0)
        return { cells: newCells }
      })

      return newData
    })
  }, [])

  const handleScroll: GridProps<unknown>["onScroll"] = (e) => {
    const totalSpace = e.currentTarget.scrollHeight - e.currentTarget.offsetHeight - 100
    const offset = e.currentTarget.scrollTop

    if (offset > totalSpace) {
      debounce(updateData, 500)
    }

    const totalWidth = e.currentTarget.scrollWidth - e.currentTarget.offsetWidth - 100
    const offsetLeft = e.currentTarget.scrollLeft

    if (offsetLeft > totalWidth) {
      debounce(updateWidths, 500)
    }
  }

  return (
    <div>
      <div style={{ height: 500, width: 500 }}>
        <Grid defaultColumnWidth={50} data={data} defaultRowHeight={50} onScroll={handleScroll}>
          {(_, styles, { column, row }) => {
            return (
              <div style={{ ...styles }} className={itemClass({ odd: (row + column) % 2 === 1 })}>
                {row},{column}
              </div>
            )
          }}
        </Grid>
      </div>
    </div>
  )
}

export const infiniteScrollGrids: RouteItem[] = [
  { label: "Grid Infinite Scroll", path: "/grid-infinite-scroll", Component: InfiniteScrolling },
]

const StickyDisabledGrid = () => <BaseGrid disableSticky />

export const stickyDisabledGrids: RouteItem[] = [
  { label: "Grid Sticky Disabled", path: "/grid-sticky-disabled", Component: StickyDisabledGrid },
]

const heightsPercentage = Array(1000)
  .fill(0)
  .map((_, i) => (["10%", "20%", "10%", "5%", "12%"] as const)[i % 5])

const widthsPercentage = Array(200)
  .fill(0)
  .map((_, i) => (["20%", "10%", "5%", "2%", "10%"] as const)[i % 5])

const GridPercentage = () => <BaseGrid defaultColumnWidth="10%" defaultRowHeight="10%" />
const GridPercentageGap = () => (
  <BaseGrid defaultColumnWidth="10%" defaultRowHeight="10%" gap={20} />
)
const GridPercentageVariable = () => <BaseGrid cw={widthsPercentage} rh={heightsPercentage} />
const GridPercentageVariableGap = () => (
  <BaseGrid cw={widthsPercentage} rh={heightsPercentage} gap={20} />
)

export const percentageSizeGrids: RouteItem[] = [
  { label: "Percentage", path: "/grid-percentage", Component: GridPercentage },
  { label: "Grid Percentage Gap", path: "/grid-percentage-gap", Component: GridPercentageGap },
  {
    label: "Percentage Variable",
    path: "/grid-percentage-variable",
    Component: GridPercentageVariable,
  },
  {
    label: "Percentage Variable Gap",
    path: "/grid-percentage-variable-gap",
    Component: GridPercentageVariableGap,
  },
]