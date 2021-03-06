import * as React from "react"

interface UseVerticalIndices {
  itemDimensions: number[]
  windowDimension: number
  offset: number
  overscan: number
}

export const useIndicesForDimensions = ({
  windowDimension,
  offset,
  itemDimensions,
  overscan,
}: UseVerticalIndices) => {
  const maxDim = React.useMemo(() => Math.max(...itemDimensions), [itemDimensions])

  const [start, end, running] = React.useMemo(() => {
    let start = 0
    let runningTotal = 0

    while (runningTotal < Math.max(0, offset - overscan * maxDim - maxDim)) {
      const itemDim = itemDimensions[start]

      // If the itemDim is less than zero then the window calculations are not complete. To
      // avoid creating a NaN value, we simply break out of the loop.
      if (itemDim + runningTotal > offset || itemDim < 0) break

      start++
      runningTotal += itemDim
    }

    let end = start
    let endingTotal = runningTotal

    while (endingTotal < offset + windowDimension + overscan * maxDim) {
      const itemDim = itemDimensions[end]

      endingTotal += itemDim
      end++
    }

    return [start, end, runningTotal]
  }, [offset, overscan, maxDim, windowDimension, itemDimensions])

  return [start, end, running] as const
}
