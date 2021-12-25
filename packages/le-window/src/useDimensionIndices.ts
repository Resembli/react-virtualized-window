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

    const startDim = itemDimensions[start]
    let end = start
    let endDim = 0
    while (end < itemDimensions.length && endDim < windowDimension + startDim) {
      const itemDim = itemDimensions[end]

      endDim += itemDim
      end++
    }

    return [start, end, runningTotal]
  }, [itemDimensions, windowDimension, offset])

  return [start, end, running] as const
}
