import * as React from "react"

export type RowRendererType<T> = (props: { data: T; style: React.CSSProperties }) => JSX.Element

interface UseVirtualTableArgs<T> {
  rowData: T[]
  RowRenderer: RowRendererType<T>
  defaultHeight: number
  overscan?: number
  rowHeights?: Record<number | string, number>
}

export function useVirtualTable<T>({
  rowData,
  defaultHeight,
  rowHeights,
  overscan = 2,
  RowRenderer,
}: UseVirtualTableArgs<T>) {
  const [topOffset, setTopOffset] = React.useState(0)
  const [bodyHeight, setBodyHeight] = React.useState(0)
  const tableRef = React.useRef<HTMLTableSectionElement>(null)

  React.useEffect(() => {
    const bodyHeight = Math.max(tableRef.current?.clientHeight ?? 0, 0)

    setBodyHeight(bodyHeight)
  }, [])

  const [totalHeight, maxDim] = React.useMemo(() => {
    if (!rowHeights) return [defaultHeight * rowData.length, defaultHeight]

    let maxDim = defaultHeight
    let height = 0

    for (let i = 0; i < rowData.length; i++) {
      const itemDim = rowHeights[i] ?? defaultHeight
      height += itemDim
      maxDim = Math.max(maxDim, itemDim)
    }

    return [height, maxDim]
  }, [defaultHeight, rowData, rowHeights])

  const [startIndex, endIndex, runningHeight] = React.useMemo(() => {
    let start = 0
    let runningTotal = 0

    while (runningTotal < Math.max(0, topOffset - maxDim - overscan * maxDim)) {
      const itemDim = rowHeights?.[start] ?? defaultHeight

      // If the itemDim is less than zero then the window calculations are not complete. To
      // avoid creating a NaN value, we simply break out of the loop.
      if (itemDim + runningTotal > topOffset || itemDim < 0) break

      start++
      runningTotal += itemDim
    }

    let end = start
    let endingTotal = runningTotal

    while (endingTotal < topOffset + bodyHeight) {
      const itemDim = rowHeights?.[end] ?? defaultHeight

      endingTotal += itemDim
      end++
    }

    return [start, end, runningTotal]
  }, [bodyHeight, defaultHeight, maxDim, overscan, rowHeights, topOffset])

  const renderedHeight = React.useMemo(() => {
    let height = 0
    for (let i = startIndex; i < endIndex; i++) {
      height += rowHeights?.[i] ?? defaultHeight
    }
    return height
  }, [defaultHeight, endIndex, rowHeights, startIndex])

  console.log(totalHeight, runningHeight, renderedHeight)

  const remainingHeight = React.useMemo(
    () => totalHeight - runningHeight - renderedHeight,
    [renderedHeight, runningHeight, totalHeight],
  )

  const onScroll: React.UIEventHandler = React.useCallback(
    (e) => {
      setTopOffset(Math.min(e.currentTarget.scrollTop, totalHeight - bodyHeight))
    },
    [bodyHeight, totalHeight],
  )

  const rows = React.useMemo(() => {
    const userRows = rowData.slice(startIndex, endIndex).map((row, i) => {
      const heightForRow = rowHeights?.[startIndex + i] ?? defaultHeight
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
  }, [
    RowRenderer,
    defaultHeight,
    endIndex,
    remainingHeight,
    rowData,
    rowHeights,
    runningHeight,
    startIndex,
  ])

  const [bodyStyle, bodyProps, tableStyle] = React.useMemo(() => {
    return [
      { display: "block", overflow: "auto" },
      { ref: tableRef, onScroll },
      { display: "block" },
    ] as const
  }, [onScroll])

  return {
    tableStyle,
    bodyStyle,
    bodyProps,
    rows,
  }
}
