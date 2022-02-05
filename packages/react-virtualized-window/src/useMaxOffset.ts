import { useMemo } from "react"

export function useMaxOffset(currentOffset: number, maxOffset: number) {
  return useMemo(() => Math.min(currentOffset, maxOffset), [currentOffset, maxOffset])
}
