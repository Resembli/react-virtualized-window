import { useMemo } from "react"

interface UseVerticalIndices {
  itemDimensions: number[]
  windowDimension: number
  offset: number
  overscan: boolean | number
}

export const useIndicesForDimensions = ({
  windowDimension,
  offset,
  itemDimensions,
  overscan,
}: UseVerticalIndices) => {
  const overscanValue = useMemo(() => {
    if (typeof overscan === "boolean") return overscan ? Math.max(...itemDimensions) : 0

    return overscan
  }, [itemDimensions, overscan])

  const [start, end, running] = useMemo(() => {
    let start = 0
    let runningTotal = 0

    while (runningTotal < Math.max(0, offset - overscanValue * 2)) {
      const itemDim = itemDimensions[start]
      if (itemDim + runningTotal > offset) break

      start++
      runningTotal += itemDim
    }

    let end = start
    let endingTotal = runningTotal

    while (endingTotal <= offset + windowDimension + overscanValue) {
      const itemDim = itemDimensions[end]

      endingTotal += itemDim
      end++
    }

    return [start, end, runningTotal]
  }, [offset, overscanValue, windowDimension, itemDimensions])

  return [start, end, running] as const
}
