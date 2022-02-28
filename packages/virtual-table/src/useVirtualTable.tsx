import * as React from "react"

export type RowRendererType<T> = (props: { data: T; style: React.CSSProperties }) => JSX.Element

interface UseVirtualTableArgs<T> {
  rowData: T[]
  RowRenderer: RowRendererType<T>
  defaultHeight: number
  rowHeights?: Record<number | string, number>
}

export function useVirtualTable<T>({
  rowData,
  defaultHeight,
  RowRenderer,
}: UseVirtualTableArgs<T>) {
  const [topOffset, setTopOffset] = React.useState(0)
  const [bodyHeight, setBodyHeight] = React.useState(0)
  const tableRef = React.useRef<HTMLTableElement>(null)

  React.useLayoutEffect(() => {
    const tHead = tableRef.current?.getElementsByTagName("thead")[0]

    const headHeight = tHead?.clientHeight ?? 0
    const bodyHeight = Math.max((tableRef.current?.clientHeight ?? 0) - headHeight, 0)

    setBodyHeight(bodyHeight)
  }, [])

  const totalHeight = React.useMemo(() => {
    return defaultHeight * rowData.length
  }, [defaultHeight, rowData.length])

  const startIndex = React.useMemo(() => {
    return Math.floor(topOffset / defaultHeight)
  }, [defaultHeight, topOffset])

  const endIndex = React.useMemo(() => {
    return bodyHeight / defaultHeight + startIndex + 1
  }, [bodyHeight, defaultHeight, startIndex])

  const runningHeight = React.useMemo(() => startIndex * defaultHeight, [defaultHeight, startIndex])
  const remainingHeight = React.useMemo(
    () => totalHeight - runningHeight - bodyHeight,
    [bodyHeight, runningHeight, totalHeight],
  )

  const onScroll: React.UIEventHandler = React.useCallback(
    (e) => {
      setTopOffset(Math.min(e.currentTarget.scrollTop, totalHeight - bodyHeight))
    },
    [bodyHeight, totalHeight],
  )

  const rows = React.useMemo(() => {
    const userRows = rowData.slice(startIndex, endIndex).map((row, i) => {
      const heightForRow = defaultHeight
      const style = { minHeight: heightForRow, height: heightForRow, maxHeight: heightForRow }

      return <RowRenderer key={i + startIndex} data={row} style={style} />
    })

    return (
      <>
        <tr style={{ height: runningHeight }} aria-hidden />
        {userRows}
        <tr style={{ height: remainingHeight }} aria-hidden />
      </>
    )
  }, [RowRenderer, defaultHeight, endIndex, remainingHeight, rowData, runningHeight, startIndex])

  const tableProps = React.useMemo(() => {
    return { ref: tableRef, onScroll, style: { display: "block", overflow: "auto" } }
  }, [onScroll])

  return {
    tableProps,
    rows,
  }
}
