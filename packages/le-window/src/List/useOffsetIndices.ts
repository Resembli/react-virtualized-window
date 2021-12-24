import { useMemo } from "react"

import type { ListDataItem } from "../types"

export interface UseOffsetIndicesArgs<T> {
  rowHeight: number
  data: ListDataItem<T>[]
  height: number
  offset: number
  variableHeights: boolean
}

export const useOffsetIndices = <T>({
  rowHeight,
  height,
  offset,
  variableHeights,
  data,
}: UseOffsetIndicesArgs<T>) => {
  const [start, end, runningHeight] = useMemo(() => {
    if (!variableHeights) {
      const itemsPerWindow = Math.ceil(height / rowHeight)

      const start = Math.max(0, Math.floor(offset / rowHeight))
      const end = itemsPerWindow + start

      return [start, end, start * rowHeight]
    } else {
      let start = 0
      let runningHeight = 0

      while (start < data.length) {
        const itemHeight = data[start].height ?? rowHeight
        if (itemHeight + runningHeight > offset) break

        start++
        runningHeight += itemHeight
      }

      const startItemHeight = data[start].height ?? rowHeight
      let end = start
      let endHeight = 0
      while (end < data.length && endHeight < height + startItemHeight) {
        const itemHeight = data[end].height ?? rowHeight

        endHeight += itemHeight
        end++
      }

      return [start, end, runningHeight]
    }
  }, [variableHeights, height, rowHeight, offset, data])

  return [start, end, runningHeight] as const
}
