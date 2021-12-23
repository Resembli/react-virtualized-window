import { useMemo } from "react"

import type { ListDataItem } from "./types"

export interface UseInnerHeight<T> {
  rowHeight: number
  data: ListDataItem<T>[]
  variableHeights: boolean
}

export const useInnerHeight = <T>({ rowHeight, data, variableHeights }: UseInnerHeight<T>) => {
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

  return innerHeight
}
