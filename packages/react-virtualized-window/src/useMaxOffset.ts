import { useMemo } from "react"

export function useMaxOffset(currentOffset: number, maxOffset: number) {
  return useMemo(() => {
    if (maxOffset < 0) return 0
    return Math.min(currentOffset, maxOffset)
  }, [currentOffset, maxOffset])
}
