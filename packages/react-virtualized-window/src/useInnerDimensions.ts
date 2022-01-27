import { useMemo } from "react"

interface UseInnerDimensionArgs {
  dataDimensions: number[]
  gapBetweenItems: number
}

export const useInnerDimension = ({ dataDimensions, gapBetweenItems }: UseInnerDimensionArgs) => {
  const innerDimension = useMemo(() => {
    let runningTotal = 0
    for (let i = 0; i < dataDimensions.length; i++) {
      runningTotal += dataDimensions[i]
    }

    runningTotal += gapBetweenItems * dataDimensions.length + gapBetweenItems

    return runningTotal
  }, [dataDimensions, gapBetweenItems])

  return innerDimension
}
