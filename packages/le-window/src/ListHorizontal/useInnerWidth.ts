import { useMemo } from "react"

import type { ListHorizontalDataItem } from "../List/types"

export interface UseInnerWidthArgs<T> {
  columnWidth: number
  data: ListHorizontalDataItem<T>[]
}

export const useInnerWidth = <T>({ data, columnWidth }: UseInnerWidthArgs<T>) => {
  const width = useMemo(() => {
    return data.length * columnWidth
  }, [columnWidth, data.length])

  return width
}
