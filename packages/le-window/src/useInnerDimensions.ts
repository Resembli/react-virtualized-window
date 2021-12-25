import { useMemo } from "react"

export const useInnerHeight = (dataHeights: number[]) => {
  const innerHeight = useMemo(() => {
    let runningHeight = 0
    for (let i = 0; i < dataHeights.length; i++) {
      runningHeight += dataHeights[i]
    }
    return runningHeight
  }, [dataHeights])

  return innerHeight
}

interface UseInnerWidthArgs {
  columnWidth: number
  data: { width?: number }[]
  variableWidths: boolean
}

export const useInnerWidth = ({ data, columnWidth, variableWidths }: UseInnerWidthArgs) => {
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

export interface UseInnerWidthGridArgs {
  data: { cells: { width?: number }[] }[]
  columnWidth: number
  variableWidths: boolean
}

export const useInnerWidthGrid = ({ data, columnWidth, variableWidths }: UseInnerWidthGridArgs) => {
  const width = useMemo(() => {
    if (!data.length) return 0

    if (!variableWidths) {
      return data[0].cells.length * columnWidth
    } else {
      return 0
    }
  }, [columnWidth, data, variableWidths])

  return width
}
