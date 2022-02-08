import { useCallback, useRef, useState } from "react"

import { List } from "@resembli/react-virtualized-window"
import type { ListProps, VirtualWindowApi } from "@resembli/react-virtualized-window"

import { DEFAULT_HEIGHT_ARRAY, DEFAULT_ROW_COUNT, DEFAULT_ROW_HEIGHT } from "../../constants"
import { debounce } from "../../debouce"
import { css } from "../../theme/theme"
import type { RouteItem } from "../../types"

const data = Array(DEFAULT_ROW_COUNT)
  .fill(0)
  .map((_, i) => i)

const heights = Array(DEFAULT_ROW_COUNT)
  .fill(0)
  .map((_, i) => DEFAULT_HEIGHT_ARRAY[i % DEFAULT_HEIGHT_ARRAY.length])

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

type BaseListProps = Omit<
  ListProps<unknown>,
  "data" | "defaultRowHeight" | "rowHeights" | "children"
> & {
  rh?: ListProps<unknown>["rowHeights"]
  defaultRowHeight?: ListProps<unknown>["defaultRowHeight"]
}

function BaseNList({
  rh,
  defaultRowHeight = DEFAULT_ROW_HEIGHT,
  "data-testid": dataId = "list",
  ...otherProps
}: BaseListProps) {
  return (
    <List
      data={data}
      defaultRowHeight={defaultRowHeight}
      rowHeights={rh}
      data-testid={dataId}
      {...otherProps}
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

const NList = () => <BaseNList />
const ListRTL = () => <BaseNList rtl />
const ListGap = () => <BaseNList gap={20} />
const ListGapRTL = () => <BaseNList gap={20} rtl />

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

const Overscan = () => <BaseNList overscan={5} width="50%" height="50%" />
const OverscanGap = () => <BaseNList overscan={5} width="50%" height="50%" gap={20} />
const OverscanRTL = () => <BaseNList overscan={5} width="50%" height="50%" rtl />
const OverscanVariable = () => <BaseNList overscan={5} width="50%" height="50%" rh={heights} />
const OverscanVariableGap = () => (
  <BaseNList overscan={5} width="50%" height="50%" rh={heights} gap={20} />
)

export const basicLists: RouteItem[] = [
  { label: "Basic", path: "/list", Component: NList },
  { label: "RTL", path: "/list-rtl", Component: ListRTL },
  { label: "Var Basic", path: "/list-var-basic", Component: VarNList },
  { label: "Var RTL", path: "/list-var-rtl", Component: VarNListRTL },
]

export const gapLists: RouteItem[] = [
  { label: "Gap", path: "/list-gap", Component: ListGap },
  { label: "Gap RTL", path: "/list-gap-rtl", Component: ListGapRTL },
  { label: "Var H Gap", path: "/list-var-height-gap", Component: VarNListGap },
  { label: "Var H Gap RTL", path: "/list-var-height-gap-rtl", Component: VarNListGapRTL },
  { label: "Var Gap", path: "/list-basic-var-gap", Component: NListVarGap },
  { label: "Var Gap RTL", path: "/list-var-gap-rtl", Component: NListVarGapRTL },
  { label: "Var H Var Gap", path: "/list-var-height-var-gap", Component: VarNListVarGap },
  {
    label: "Var H Var Gap RTL",
    path: "/list-var-height-var-gap-rtl",
    Component: VarNListVarGapRTL,
  },
]

export const overscanLists: RouteItem[] = [
  { label: "Overscan", path: "/list-overscan", Component: Overscan },
  { label: "Overscan Gap", path: "/list-overscan-gap", Component: OverscanGap },
  { label: "Overscan RTL", path: "/list-overscan-rtl", Component: OverscanRTL },
  { label: "Overscan Variable", path: "/list-overscan-variable", Component: OverscanVariable },
  {
    label: "Overscan Variable Gap",
    path: "/list-overscan-variable-gap",
    Component: OverscanVariableGap,
  },
]

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

export const multipleLists: RouteItem[] = [
  { label: "Multiple Lists", path: "/list-multiple", Component: MultipleNList },
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
        <BaseNList gap={gap} rtl={rtl} />
      </div>
    </div>
  )
}

const SizingList = () => <BaseSizing />
const SizingListGap = () => <BaseSizing gap={20} />
const SizingListTransitions = () => <BaseSizing gap={20} transitions />
const SizingListRTL = () => <BaseSizing gap={20} transitions rtl />

export const sizingLists: RouteItem[] = [
  { label: "Sizing List", path: "/list-sizing", Component: SizingList },
  { label: "Gap", path: "/list-sizing-gap", Component: SizingListGap },
  { label: "Transitions", path: "/list-sizing-trans", Component: SizingListTransitions },
  { label: "RTL", path: "/list-sizing-rtl", Component: SizingListRTL },
]

const customStyle = css({
  border: "20px solid blue",
  margin: 20,
})

const style = {
  border: "20px solid red",
  margin: 20,
}

const ClassNameList = () => <BaseNList className={customStyle()} width="50%" height="50%" />
const StyleList = () => <BaseNList style={style} width="50%" height="50%" />

export const stylingLists: RouteItem[] = [
  { label: "Class Name List", path: "/list-classname", Component: ClassNameList },
  { label: "Style List", path: "/list-style", Component: StyleList },
]

const OnScroll = () => {
  const [offset, setOffset] = useState(0)

  return (
    <div>
      <div>
        <h3>Offset: {offset}</h3>
      </div>
      <div style={{ height: 200, width: 500 }}>
        <BaseNList onScroll={(e) => setOffset(e.currentTarget.scrollTop)} />
      </div>
    </div>
  )
}

const Api = () => {
  const apiRef = useRef<VirtualWindowApi>()

  const handleClick = () => {
    if (!apiRef.current) return

    apiRef.current.scrollBy({ top: 1000 })
  }

  const handleToTop = () => {
    if (!apiRef.current) return

    apiRef.current.scrollTo({ top: 0 })
  }

  return (
    <div>
      <div>
        <h3>Api Controls</h3>
        <button onClick={handleClick}>Scroll By 1,000</button>
        <button onClick={handleToTop}>Scroll To Top</button>
      </div>
      <div style={{ height: 200, width: 500 }}>
        <BaseNList apiRef={apiRef} />
      </div>
    </div>
  )
}

const TabIndex = () => <BaseNList tabIndex={0} />

export const onScrollApiTabIndexLists: RouteItem[] = [
  { label: "On Scroll", path: "/list-on-scroll", Component: OnScroll },
  { label: "Api", path: "/list-api", Component: Api },
  { label: "Tab Index", path: "/list-index", Component: TabIndex },
]

const InfiniteScrolling = () => {
  const [data, setData] = useState(Array(50).fill(0))

  const updateData = useCallback(() => setData((prev) => [...prev, ...Array(50).fill(0)]), [])

  const handleScroll: ListProps<unknown>["onScroll"] = (e) => {
    const totalSpace = e.currentTarget.scrollHeight - e.currentTarget.offsetHeight - 100
    const offset = e.currentTarget.scrollTop

    if (offset > totalSpace) {
      debounce(updateData, 500)
    }
  }

  return (
    <div>
      <div style={{ height: 500, width: 500 }}>
        <List data={data} defaultRowHeight={50} onScroll={handleScroll}>
          {(_, style, { row }) => {
            const clx = itemClass({ odd: row % 2 === 1 })
            return (
              <div style={style} className={clx}>
                {row}
              </div>
            )
          }}
        </List>
      </div>
    </div>
  )
}

export const infiniteScrollLists: RouteItem[] = [
  { label: "List Infinite Scroll", path: "/list-infinite-scroll", Component: InfiniteScrolling },
]

const StickyDisabledList = () => <BaseNList disableSticky />

export const stickyDisabledList: RouteItem[] = [
  {
    label: "Sticky Disabled",
    path: "/list-sticky-disabled",
    Component: StickyDisabledList,
  },
]

const heightsPercentage = Array(2000)
  .fill(0)
  .map((_, i) => (["10%", "20%", "5%"] as const)[i % 3])

const ListPercentage = () => <BaseNList defaultRowHeight="10%" />
const ListPercentageGap = () => <BaseNList defaultRowHeight="10%" gap={10} />
const ListPercentageVariable = () => <BaseNList defaultRowHeight="10%" rh={heightsPercentage} />
const ListPercentageVariableGap = () => (
  <BaseNList defaultRowHeight="10%" rh={heightsPercentage} gap={25} />
)

export const percentageList: RouteItem[] = [
  { label: "Percentage", path: "/list-percentage", Component: ListPercentage },
  { label: "Percentage Gap", path: "/list-percentage-gap", Component: ListPercentageGap },
  {
    label: "Percentage Variable",
    path: "/list-percentage-variable",
    Component: ListPercentageVariable,
  },
  {
    label: "Percentage Variable Gap",
    path: "/list-percentage-variable-gap",
    Component: ListPercentageVariableGap,
  },
]
