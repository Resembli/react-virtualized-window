import * as React from "react"

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
  const [maxDim, minDim] = React.useMemo(
    () => [
      Math.max(...itemDimensions) + gapBetweenItems,
      Math.min(...itemDimensions) + gapBetweenItems,
    ],
    [gapBetweenItems, itemDimensions],
  )

  const previousValues = React.useRef([0, 0, 0])

  const [start, end, running] = React.useMemo(() => {
    const offsetDiff = offset - previousValues.current[2]

    // We can skip some calculations when the scroll offset would not be enough to change the
    // start and end indices. We use `minDim / 2` as a heuristic for this.
    if (offsetDiff < minDim / 2 && offsetDiff > 0) {
      return previousValues.current
    }

    let start = 0
    let runningTotal = 0

    while (runningTotal < Math.max(0, offset - overscan * maxDim - maxDim)) {
      const itemDim = itemDimensions[start] + gapBetweenItems

      // If the itemDim is less than zero then the window calculations are not complete. To
      // avoid creating a NaN value, we simply break out of the loop.
      if (itemDim + runningTotal > offset || itemDim < 0) break

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

    previousValues.current = [start, end, runningTotal]
    return previousValues.current
  }, [offset, minDim, overscan, maxDim, windowDimension, itemDimensions, gapBetweenItems])

  return [start, end, running] as const
}
