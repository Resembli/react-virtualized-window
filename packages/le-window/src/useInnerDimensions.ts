import { useMemo } from "react"

import type { GridDataRow, ListDataItem, ListHorizontalDataItem } from "./types"

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

export interface UseInnerGridDimensionsArgs<T> {
  rowHeight: number
  columnWidth: number
  data: GridDataRow<T>[]
}

export const useInnerGridDimensions = <T>({
  data,
  rowHeight,
  columnWidth,
}: UseInnerGridDimensionsArgs<T>) => {
  const innerHeight = useMemo(() => {
    return rowHeight * data.length
  }, [data.length, rowHeight])

  const innerWidth = useMemo(() => {
    let maxWidth = 0
    for (let i = 0; i < data.length; i++) {
      maxWidth = Math.max(data[i].cells.length * columnWidth, maxWidth)
    }

    return maxWidth
  }, [columnWidth, data])

  return [innerWidth, innerHeight]
}
