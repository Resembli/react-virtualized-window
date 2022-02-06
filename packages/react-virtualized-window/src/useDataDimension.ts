import { useMemo } from "react"

import { getScrollbarWidth } from "./getScrollbarWidth"
import type { NumberOrPercent } from "./types"

interface UseDataHeightsArgs {
  count: number
  defaultDimension: NumberOrPercent
  windowDim: number
  dimensions?: NumberOrPercent[]
}

function percentToNumber(percent: string) {
  return parseFloat(percent) / 100.0
}

export const useDataDimension = ({
  count,
  defaultDimension,
  windowDim,
  dimensions,
}: UseDataHeightsArgs) => {
  const [dataDimensions, dimTotal, hasScrollBar] = useMemo(() => {
    let draftDimensions = []

    const dimDefault =
      typeof defaultDimension === "string"
        ? percentToNumber(defaultDimension) * windowDim
        : defaultDimension

    let hasScrollBar = false
    let runningTotal = 0

    for (let i = 0; i < count; i++) {
      const dimToUse = (dimensions && dimensions[i]) || dimDefault

      const wideDim = windowDim - (hasScrollBar ? getScrollbarWidth() : 0)
      const dimAsNum =
        typeof dimToUse === "string" ? percentToNumber(dimToUse) * (windowDim - wideDim) : dimToUse

      runningTotal += dimAsNum

      if (runningTotal > windowDim && !hasScrollBar) {
        hasScrollBar = true
        runningTotal = 0
        i = -1
        draftDimensions = []
      }

      draftDimensions.push(dimAsNum)
    }

    return [draftDimensions, runningTotal, hasScrollBar]
  }, [count, defaultDimension, dimensions, windowDim])

  return [dataDimensions, dimTotal, hasScrollBar] as const
}
