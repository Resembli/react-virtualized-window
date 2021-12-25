import { useMemo } from "react"

interface UseDataHeightsArgs {
  count: number
  defaultHeight: number
  heights?: number[]
}

export const useDataHeights = ({ count, defaultHeight, heights }: UseDataHeightsArgs) => {
  const dataHeights = useMemo(() => {
    const draftHeights = []

    for (let i = 0; i < count; i++) {
      draftHeights.push((heights && heights[i]) ?? defaultHeight)
    }
    return draftHeights
  }, [count, defaultHeight, heights])

  return dataHeights
}
