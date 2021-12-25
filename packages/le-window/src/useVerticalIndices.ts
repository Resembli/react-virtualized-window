import { useMemo } from "react"

interface UseVerticalIndices {
  dataHeights: number[]
  height: number
  offset: number
}

export const useVerticalIndices = ({ height, offset, dataHeights }: UseVerticalIndices) => {
  const [start, end, runningHeight] = useMemo(() => {
    let start = 0
    let runningHeight = 0

    while (start < dataHeights.length) {
      const itemHeight = dataHeights[start]
      if (itemHeight + runningHeight > offset) break

      start++
      runningHeight += itemHeight
    }

    const startItemHeight = dataHeights[start]
    let end = start
    let endHeight = 0
    while (end < dataHeights.length && endHeight < height + startItemHeight) {
      const itemHeight = dataHeights[end]

      endHeight += itemHeight
      end++
    }

    return [start, end, runningHeight]
  }, [dataHeights, height, offset])

  return [start, end, runningHeight] as const
}
