import { useMemo } from "react"

import { getScrollbarWidth } from "./getScrollbarWidth"
import type { NumberOrPercent } from "./types"

interface UseDataDimensionArgs {
  count: number
  defaultDimension: NumberOrPercent
  windowDim: number
  dimensions?: NumberOrPercent[]
}

function percentToNumber(percent: string) {
  return parseFloat(percent) / 100.0
}

function checkForScrollBar({
  windowDim,
  defaultDimension,
  count,
  dimensions,
}: UseDataDimensionArgs) {
  let runningTotal = 0
  for (let i = 0; i < count; i++) {
    const dimToUse = (dimensions && dimensions[i]) || defaultDimension
    const dimAsNum = typeof dimToUse === "string" ? percentToNumber(dimToUse) * windowDim : dimToUse

    runningTotal += dimAsNum
    if (runningTotal >= windowDim) return true
  }
  return false
}

export const useDataDimension = (args: UseDataDimensionArgs) => {
  const hasScrollBar = checkForScrollBar(args)

  const windowDim = hasScrollBar ? args.windowDim - getScrollbarWidth() : args.windowDim

  const [dataDimensions, dimTotal] = useMemo(() => {
    const { count, defaultDimension, dimensions } = args
    const draftDimensions = []

    const dimDefault =
      typeof defaultDimension === "string"
        ? percentToNumber(defaultDimension) * windowDim
        : defaultDimension

    let runningTotal = 0

    for (let i = 0; i < count; i++) {
      const dimToUse = (dimensions && dimensions[i]) || dimDefault

      const dimAsNum =
        typeof dimToUse === "string" ? percentToNumber(dimToUse) * windowDim : dimToUse

      runningTotal += dimAsNum
      draftDimensions.push(dimAsNum)
    }

    return [draftDimensions, runningTotal]
  }, [args, windowDim])

  return [dataDimensions, dimTotal, windowDim] as const
}
