import type { UIEventHandler } from "react"
import { useCallback, useState } from "react"

export const useWindowScroll = () => {
  const [verticalOffset, setVerticalOffset] = useState(0)
  const [horizontalOffset, setHorizontalOffset] = useState(0)

  const onScroll: UIEventHandler<HTMLDivElement> = useCallback((event) => {
    const target = event.currentTarget

    const verticalOffset = Math.max(0, target.scrollTop)
    const horizontalOffset = Math.max(0, target.scrollLeft)

    setHorizontalOffset(horizontalOffset)
    setVerticalOffset(verticalOffset)
  }, [])

  return [verticalOffset, horizontalOffset, onScroll] as const
}
