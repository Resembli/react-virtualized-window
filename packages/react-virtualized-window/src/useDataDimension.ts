import { useMemo } from "react"

interface UseDataHeightsArgs {
  count: number
  defaultDimension: number
  dimensions?: number[]
}

export const useDataDimension = ({ count, defaultDimension, dimensions }: UseDataHeightsArgs) => {
  const dataDimensions = useMemo(() => {
    const draftDimensions = []

    for (let i = 0; i < count; i++) {
      draftDimensions.push((dimensions && dimensions[i]) ?? defaultDimension)
    }
    return draftDimensions
  }, [count, defaultDimension, dimensions])

  return dataDimensions
}
