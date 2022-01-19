import { useMemo } from "react"

interface UseVerticalIndices {
  itemDimensions: number[]
  windowDimension: number
  offset: number
}

export const useIndicesForDimensions = ({
  windowDimension,
  offset,
  itemDimensions,
}: UseVerticalIndices) => {
  const [start, end, running] = useMemo(() => {
    let start = 0
    let runningTotal = 0

    while (start < itemDimensions.length) {
      const itemDim = itemDimensions[start]
      if (itemDim + runningTotal > offset) break

      start++
      runningTotal += itemDim
    }

    /**
     * We over scan a little to allow items to be tab-reachable. We don't want to
     * over scan too much as that would result in a performance bottleneck.
     */
    const overScan = Math.max(0, start - 3)
    let overScanOffset = 0
    while (start > overScan) {
      runningTotal -= itemDimensions[start]
      overScanOffset += itemDimensions[start]
      start--
    }

    const startDim = itemDimensions[start]
    let end = start
    let endDim = 0

    while (end < itemDimensions.length && endDim < windowDimension + overScanOffset + startDim) {
      const itemDim = itemDimensions[end]

      endDim += itemDim
      end++
    }

    return [start, end, runningTotal + overScanOffset / 2]
  }, [itemDimensions, windowDimension, offset])

  return [start, end, running] as const
}
