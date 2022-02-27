import type React from "react"
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react"

interface UseVirtualTableArgs<T> {
  rowData: T[]
  defaultHeight: number
  rowHeights?: Record<number | string, number>
}

export function useVirtualTable<T>({ rowData, defaultHeight }: UseVirtualTableArgs<T>) {
  const [topOffset, setTopOffset] = useState(0)
  const [bodyHeight, setBodyHeight] = useState(0)
  const tableRef = useRef<HTMLTableElement>(null)

  useLayoutEffect(() => {
    const tHead = tableRef.current?.getElementsByTagName("thead")[0]

    const headHeight = tHead?.clientHeight ?? 0
    const bodyHeight = Math.max((tableRef.current?.clientHeight ?? 0) - headHeight, 0)

    setBodyHeight(bodyHeight)
  }, [])

  const totalHeight = useMemo(() => {
    return defaultHeight * rowData.length
  }, [defaultHeight, rowData.length])

  const startIndex = useMemo(() => {
    return Math.floor(topOffset / defaultHeight)
  }, [defaultHeight, topOffset])

  const endIndex = useMemo(() => {
    return bodyHeight / defaultHeight + startIndex + 1
  }, [bodyHeight, defaultHeight, startIndex])

  const runningHeight = useMemo(() => startIndex * defaultHeight, [defaultHeight, startIndex])
  const remainingHeight = useMemo(
    () => totalHeight - runningHeight - bodyHeight,
    [bodyHeight, runningHeight, totalHeight],
  )

  const onScroll: React.UIEventHandler = useCallback(
    (e) => {
      setTopOffset(Math.min(e.currentTarget.scrollTop, totalHeight - bodyHeight))
    },
    [bodyHeight, totalHeight],
  )

  const tableProps = useMemo(() => {
    return { ref: tableRef, onScroll }
  }, [onScroll])

  const bodyProps = useMemo(() => {
    return {
      startIndex,
      endIndex,
      runningHeight,
      remainingHeight,
      rowHeights: [],
      rowItems: rowData,
    }
  }, [endIndex, remainingHeight, rowData, runningHeight, startIndex])

  return {
    tableProps,
    bodyProps,
  }
}
