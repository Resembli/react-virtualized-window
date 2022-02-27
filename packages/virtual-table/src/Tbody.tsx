import * as React from "react"

type TbodyIntrinsic = JSX.IntrinsicElements["tbody"]
export interface TbodyProps<T> extends TbodyIntrinsic {
  children: <B extends T>(props: { data: B; style: React.CSSProperties }) => JSX.Element
  rowItems: T[]
  rowHeights: number[]
  runningHeight: number
  remainingHeight: number
  startIndex: number
  endIndex: number
}

export function Tbody<T>({
  children: Component,
  rowItems,
  runningHeight,
  remainingHeight,
  startIndex,
  endIndex,
  rowHeights,
  ...props
}: TbodyProps<T>) {
  const rows = React.useMemo(() => {
    return rowItems.slice(startIndex, endIndex).map((row, i) => {
      const heightForRow = rowHeights[i + startIndex]
      const style = { minHeight: heightForRow, height: heightForRow, maxHeight: heightForRow }

      return <Component key={i + startIndex} data={row} style={style} />
    })
  }, [Component, endIndex, rowHeights, rowItems, startIndex])

  return (
    <tbody {...props}>
      <tr style={{ height: runningHeight }} aria-hidden />
      {rows}
      <tr style={{ height: remainingHeight }} aria-hidden />
    </tbody>
  )
}
