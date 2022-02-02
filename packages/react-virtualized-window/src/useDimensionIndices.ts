import { useMemo } from "react"

interface UseVerticalIndices {
  itemDimensions: number[]
  gapBetweenItems: number
  windowDimension: number
  offset: number
  overscan: number
}

export const useIndicesForDimensions = ({
  windowDimension,
  offset,
  gapBetweenItems = 0,
  itemDimensions,
  overscan,
}: UseVerticalIndices) => {
  const maxDim = useMemo(
    () => Math.max(...itemDimensions) + gapBetweenItems,
    [gapBetweenItems, itemDimensions],
  )

  const [start, end, running] = useMemo(() => {
    let start = 0
    let runningTotal = 0

    while (runningTotal < Math.max(0, offset - overscan * maxDim - maxDim)) {
      const itemDim = itemDimensions[start] + gapBetweenItems
      if (itemDim + runningTotal > offset) break

      start++
      runningTotal += itemDim
    }

    let end = start
    let endingTotal = runningTotal

    while (endingTotal < offset + windowDimension + overscan * maxDim) {
      const itemDim = itemDimensions[end] + gapBetweenItems

      endingTotal += itemDim
      end++
    }

    return [start, end, runningTotal]
  }, [offset, overscan, maxDim, windowDimension, itemDimensions, gapBetweenItems])

  return [start, end, running] as const
}
