import { useMemo } from "react"

interface UseHorizontalIndicesGridArgs {
  data: { cells: { width?: number }[] }[]
  columnWidth: number
  offset: number
  width: number
  variableWidths: boolean
}

export const useHorizontalIndicesGrid = ({
  data,
  columnWidth,
  offset,
  width,
  variableWidths,
}: UseHorizontalIndicesGridArgs) => {
  const [start, end, runningWidth] = useMemo(() => {
    if (!data.length) return [0, 0, 0]

    if (!variableWidths) {
      const itemsPerWindow = Math.ceil(width / columnWidth)

      const start = Math.max(0, Math.floor(offset / columnWidth))
      const end = itemsPerWindow + start + 1

      return [start, end, start * columnWidth]
    } else {
      return [0, 0, 0]
    }
  }, [columnWidth, data.length, offset, variableWidths, width])

  return [start, end, runningWidth]
}
