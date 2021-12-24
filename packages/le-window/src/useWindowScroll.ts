import type { UIEventHandler } from "react"
import { useCallback, useState } from "react"

export const useWindowScroll = (userOnScroll?: UIEventHandler<HTMLElement>) => {
  const [verticalOffset, setVerticalOffset] = useState(0)
  const [horizontalOffset, setHorizontalOffset] = useState(0)

  const onScroll: UIEventHandler<HTMLElement> = useCallback(
    (event) => {
      const target = event.currentTarget

      const verticalOffset = Math.max(0, target.scrollTop)
      const horizontalOffset = Math.max(0, target.scrollLeft)

      setHorizontalOffset(horizontalOffset)
      setVerticalOffset(verticalOffset)

      userOnScroll?.(event)
    },
    [userOnScroll],
  )

  return [verticalOffset, horizontalOffset, onScroll] as const
}
