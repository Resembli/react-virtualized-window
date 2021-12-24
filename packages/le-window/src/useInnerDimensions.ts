import { useMemo } from "react"

import type { ListDataItem, ListHorizontalDataItem } from "./types"

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
