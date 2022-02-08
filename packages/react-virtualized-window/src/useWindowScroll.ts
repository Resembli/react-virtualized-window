import type { UIEventHandler } from "react"
import { useState } from "react"
import { useCallback } from "react"

interface UseWindowScrollArgs {
  rtl: boolean
  userOnScroll?: UIEventHandler<HTMLElement>
}

export const useWindowScroll = ({ userOnScroll, rtl }: UseWindowScrollArgs) => {
  const [vOffset, setVerticalOffset] = useState(0)
  const [hOffset, setHorizontalOffset] = useState(0)

  const onScroll: UIEventHandler<HTMLElement> = useCallback(
    (event) => {
      const target = event.currentTarget

      const scrollLeft = rtl ? -target.scrollLeft : target.scrollLeft
      const scrollTop = target.scrollTop

      const verticalOffset = Math.max(0, scrollTop)
      const horizontalOffset = Math.max(0, scrollLeft)

      setHorizontalOffset(horizontalOffset)
      setVerticalOffset(verticalOffset)

      userOnScroll?.(event)
    },
    [rtl, userOnScroll],
  )

  return [vOffset, hOffset, onScroll] as const
}
