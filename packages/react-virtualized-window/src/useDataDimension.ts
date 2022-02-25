import * as React from "react"

import type { NumberOrPercent } from "./types.js"

interface UseDataDimensionArgs {
  count: number
  defaultDimension: NumberOrPercent
  windowDim: number
  dimensions?: NumberOrPercent[]
}

function percentToNumber(percent: string) {
  return parseFloat(percent) / 100.0
}

function dimToNumber(dim: NumberOrPercent, windowDim: number) {
  return typeof dim === "string" ? percentToNumber(dim) * windowDim : dim
}

export const useDataDimension = ({
  count,
  windowDim,
  dimensions,
  defaultDimension,
}: UseDataDimensionArgs) => {
  const defaultAsNumber = React.useMemo(
    () => dimToNumber(defaultDimension, windowDim),
    [defaultDimension, windowDim],
  )

  const [dataDimensions, dimTotal] = React.useMemo(() => {
    const draftDimensions = []

    let runningTotal = 0
    for (let i = 0; i < count; i++) {
      const dimAsNum = dimToNumber((dimensions && dimensions[i]) || defaultAsNumber, windowDim)

      runningTotal += dimAsNum
      draftDimensions.push(dimAsNum)
    }

    return [draftDimensions, runningTotal]
  }, [count, defaultAsNumber, dimensions, windowDim])

  return [dataDimensions, dimTotal] as const
}
