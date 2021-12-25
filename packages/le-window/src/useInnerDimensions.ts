import { useMemo } from "react"

export const useInnerDimension = (dataDimensions: number[]) => {
  const innerDimension = useMemo(() => {
    let runningTotal = 0
    for (let i = 0; i < dataDimensions.length; i++) {
      runningTotal += dataDimensions[i]
    }
    return runningTotal
  }, [dataDimensions])

  return innerDimension
}
