import { useState } from "react"

import { ListHorizontal } from "@resembli/react-virtualized-window"
import type { ListHorizontalProps } from "@resembli/react-virtualized-window"

import { css } from "../../theme/theme"
import type { RouteItem } from "../../types"

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
  overscan?: ListHorizontalProps<unknown>["overscan"]
  width?: ListHorizontalProps<unknown>["width"]
  height?: ListHorizontalProps<unknown>["height"]
  className?: ListHorizontalProps<unknown>["className"]
  style?: ListHorizontalProps<unknown>["style"]
}

function BaseHList({ cw, rtl, gap, className, style, overscan, width, height }: BaseHListProps) {
  return (
    <ListHorizontal
      data={data}
      defaultColumnWidth={50}
      columnWidths={cw}
      className={className}
      style={style}
      rtl={rtl}
      gap={gap}
      overscan={overscan}
      width={width}
      height={height}
    >
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

const OverscanBasic = () => <BaseHList overscan={5} width="50%" height="50%" />
const OverscanGap = () => <BaseHList overscan={5} gap={20} width="50%" height="50%" />
const OverscanRTL = () => <BaseHList overscan={5} rtl width="50%" height="50%" />
const OverscanVariable = () => <BaseHList overscan={5} cw={widths} width="50%" height="50%" />
const OverscanVariableGap = () => (
  <BaseHList overscan={5} cw={widths} gap={20} width="50%" height="50%" />
)

export const basicHLists: RouteItem[] = [
  { label: "Basic", path: "/h-list", Component: HList },
  { label: "RTL", path: "/h-list-rtl", Component: ListRTL },
  { label: "Var Basic", path: "/h-list-var-basic", Component: VarHList },
  { label: "Var RTL", path: "/h-list-var-rtl", Component: VarHListRTL },
]

export const gapHLists: RouteItem[] = [
  { label: "Gap", path: "/h-list-gap", Component: ListGap },
  { label: "Gap RTL", path: "/h-list-gap-rtl", Component: ListGapRTL },
  { label: "Var W Gap", path: "/h-list-var-width-gap", Component: VarHListGap },
  { label: "Var W Gap RTL", path: "/h-list-var-width-gap-rtl", Component: VarHListGapRTL },
  { label: "Var Gap", path: "/h-list-basic-var-gap", Component: HListVarGap },
  { label: "Var Gap RTL", path: "/h-list-var-gap-rtl", Component: HListVarGapRTL },
  { label: "Var W Var Gap", path: "/h-list-var-width-var-gap", Component: VarHListVarGap },
  {
    label: "Var W Var Gap RTL",
    path: "/h-list-var-width-var-gap-rtl",
    Component: VarHListVarGapRTL,
  },
]

export const overscanHLists: RouteItem[] = [
  { label: "Overscan Basic", path: "/h-list-overscan", Component: OverscanBasic },
  { label: "Overscan Gap", path: "/h-list-overscan-gap", Component: OverscanGap },
  { label: "Overscan RTL", path: "/h-list-overscan-rtl", Component: OverscanRTL },
  { label: "Overscan Variable", path: "/h-list-overscan-variable", Component: OverscanVariable },
  {
    label: "Overscan Variable Gap",
    path: "/h-list-overscan-variable-gap",
    Component: OverscanVariableGap,
  },
]

const multiCss = css({
  display: "grid",
  gridTemplateColumns: "50% 50%",
  height: "100%",
  gap: 10,
  width: "90%",
})

const MultipleHList = () => {
  return (
    <div className={multiCss()}>
      <HList />
      <VarHList />
    </div>
  )
}

export const multipleHLists: RouteItem[] = [
  { label: "Multiple H Lists", path: "/h-list-multipl", Component: MultipleHList },
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
        <BaseHList gap={gap} rtl={rtl} />
      </div>
    </div>
  )
}

const SizingHList = () => <BaseSizing />
const SizingHListGap = () => <BaseSizing gap={20} />
const SizingHListTransitions = () => <BaseSizing gap={20} transitions />
const SizingHListRTL = () => <BaseSizing gap={20} transitions rtl />

export const sizingHLists: RouteItem[] = [
  { label: "Sizing H List", path: "/list-h-sizing", Component: SizingHList },
  { label: "Gap", path: "/list-h-sizing-gap", Component: SizingHListGap },
  { label: "Transitions", path: "/list-h-sizing-trans", Component: SizingHListTransitions },
  { label: "RTL", path: "/list-h-sizing-rtl", Component: SizingHListRTL },
]

const customStyle = css({
  border: "20px solid blue",
  margin: 20,
})

const style = {
  border: "20px solid red",
  margin: 20,
}

const ClassNameHList = () => <BaseHList className={customStyle()} width="50%" height="50%" />
const StyleHList = () => <BaseHList style={style} width="50%" height="50%" />

export const stylingHLists: RouteItem[] = [
  { label: "Class Name H List", path: "/h-list-classname", Component: ClassNameHList },
  { label: "Style H List", path: "/h-list-style", Component: StyleHList },
]
