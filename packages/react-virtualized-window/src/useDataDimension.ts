import { useMemo } from "react"

import type { NumberOrPercent } from "./types"

interface UseDataHeightsArgs {
  count: number
  defaultDimension: NumberOrPercent
  windowDim: number
  dimensions?: number[]
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
  const dataDimensions = useMemo(() => {
    const draftDimensions = []

    const dimDefault =
      typeof defaultDimension === "string"
        ? percentToNumber(defaultDimension) * windowDim
        : defaultDimension

    for (let i = 0; i < count; i++) {
      const dimToUse = (dimensions && dimensions[i]) || dimDefault

      const dimAsNum =
        typeof dimToUse === "string" ? percentToNumber(dimToUse) * windowDim : dimToUse

      draftDimensions.push(dimAsNum)
    }
    return draftDimensions
  }, [count, defaultDimension, dimensions, windowDim])

  return dataDimensions
}
