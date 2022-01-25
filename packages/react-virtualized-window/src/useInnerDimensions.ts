import { useMemo } from "react"

export const useInnerDimension = (dataDimensions: number[], gapBetweenItems = 0, topGap = 0) => {
  const innerDimension = useMemo(() => {
    let runningTotal = 0
    for (let i = 0; i < dataDimensions.length; i++) {
      runningTotal += dataDimensions[i]
    }

    runningTotal += gapBetweenItems * dataDimensions.length
    runningTotal += topGap

    return runningTotal
  }, [dataDimensions, gapBetweenItems, topGap])

  return innerDimension
}
