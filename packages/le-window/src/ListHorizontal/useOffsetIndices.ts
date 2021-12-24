import { useMemo } from "react"

import type { ListHorizontalDataItem } from "../types"

export interface UseOffsetIndicesArgs<T> {
  columnWidth: number
  width: number
  offset: number
  variableWidths: boolean
  data: ListHorizontalDataItem<T>[]
}

export const useOffsetIndices = <T>({
  columnWidth,
  width,
  offset,
  variableWidths,
  data,
}: UseOffsetIndicesArgs<T>) => {
  const [start, end, runningWidth] = useMemo(() => {
    if (!variableWidths) {
      const itemsPerWindow = Math.ceil(width / columnWidth)

      const start = Math.max(0, Math.floor(offset / columnWidth))
      const end = itemsPerWindow + start

      return [start, end, start * columnWidth]
    } else {
      let start = 0
      let runningWidth = 0

      while (start < data.length) {
        const itemHeight = data[start].width ?? columnWidth
        if (itemHeight + runningWidth > offset) break

        start++
        runningWidth += itemHeight
      }

      const startItemHeight = data[start].width ?? columnWidth
      let end = start
      let endHeight = 0
      while (end < data.length && endHeight < width + startItemHeight) {
        const itemHeight = data[end].width ?? columnWidth

        endHeight += itemHeight
        end++
      }

      return [start, end, runningWidth]
    }
  }, [columnWidth, data, offset, variableWidths, width])

  return [start, end, runningWidth] as const
}
