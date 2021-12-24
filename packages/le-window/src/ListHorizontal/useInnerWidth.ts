import { useMemo } from "react"

import type { ListHorizontalDataItem } from "../List/types"

export interface UseInnerWidthArgs<T> {
  columnWidth: number
  data: ListHorizontalDataItem<T>[]
  variableWidths: boolean
}

export const useInnerWidth = <T>({ data, columnWidth, variableWidths }: UseInnerWidthArgs<T>) => {
  const width = useMemo(() => {
    if (!variableWidths) {
      return data.length * columnWidth
    } else {
      let runningWidth = 0
      for (let i = 0; i < data.length; i++) {
        runningWidth += data[i].width ?? columnWidth
      }
      return runningWidth
    }
  }, [columnWidth, data, variableWidths])

  return width
}
