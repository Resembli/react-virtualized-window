import { useMemo } from "react"

import type { WindowDataItem } from "./types"

export interface UseInnerDimensionsArgs<T> {
  rowHeight: number
  data: WindowDataItem<T>[]
  variableHeights: boolean
}

export const useInnerDimensions = <T>({
  rowHeight,
  data,
  variableHeights,
}: UseInnerDimensionsArgs<T>) => {
  const innerWidth = 0

  const innerHeight = useMemo(() => {
    if (!variableHeights) {
      return rowHeight * data.length
    } else {
      let runningHeight = 0
      for (let i = 0; i < data.length; i++) {
        runningHeight += data[i].height ?? rowHeight
      }
      return runningHeight
    }
  }, [data, rowHeight, variableHeights])

  return [innerWidth, innerHeight] as const
}
