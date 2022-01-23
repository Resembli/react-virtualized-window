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

    const underScan = Math.max(100, windowDimension / 4)

    while (runningTotal < Math.max(0, offset - underScan)) {
      const itemDim = itemDimensions[start]
      if (itemDim + runningTotal > offset) break

      start++
      runningTotal += itemDim
    }

    let end = start
    let endingTotal = runningTotal

    while (endingTotal <= offset + windowDimension) {
      const itemDim = itemDimensions[end]

      endingTotal += itemDim
      end++
    }

    return [start, end, runningTotal]
  }, [itemDimensions, windowDimension, offset])

  return [start, end, running] as const
}
