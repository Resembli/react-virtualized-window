import { useMemo } from "react"

export interface UseOffsetIndicesArgs {
  columnWidth: number
  width: number
  offset: number
}

export const useOffsetIndices = ({ columnWidth, width, offset }: UseOffsetIndicesArgs) => {
  const [start, end, runningWidth] = useMemo(() => {
    const itemsPerWindow = Math.ceil(width / columnWidth)

    const start = Math.max(0, Math.floor(offset / columnWidth))
    const end = itemsPerWindow + start

    return [start, end, start * columnWidth]
  }, [columnWidth, offset, width])

  return [start, end, runningWidth] as const
}
