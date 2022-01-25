import { useMemo } from "react"

interface UseInnerDimensionArgs {
  dataDimensions: number[]
  gapBetweenItems: number
  gapTop: number
}

export const useInnerDimension = ({
  dataDimensions,
  gapBetweenItems,
  gapTop,
}: UseInnerDimensionArgs) => {
  const innerDimension = useMemo(() => {
    let runningTotal = 0
    for (let i = 0; i < dataDimensions.length; i++) {
      runningTotal += dataDimensions[i]
    }

    runningTotal += gapBetweenItems * dataDimensions.length
    runningTotal += gapTop

    return runningTotal
  }, [dataDimensions, gapBetweenItems, gapTop])

  return innerDimension
}
