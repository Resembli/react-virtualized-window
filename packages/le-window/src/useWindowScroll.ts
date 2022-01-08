import type { UIEventHandler } from "react"
import { useRef } from "react"
import { useCallback, useState } from "react"

export const useWindowScroll = (userOnScroll?: UIEventHandler<HTMLElement>) => {
  const verticalOffsetRef = useRef(0)
  const horizontalOffsetRef = useRef(0)

  // TODO: @Lee determine if we want to provide an isScrolling flag - perhaps disable pointer events??
  const [, setIsScrolling] = useState(false)

  const debounceTime = useRef<number | null>(null)

  const debouncedEnded = useCallback(() => {
    debounceTime.current = null
    setIsScrolling(false)
  }, [])

  const onScroll: UIEventHandler<HTMLElement> = useCallback(
    (event) => {
      const target = event.currentTarget

      const verticalOffset = Math.max(0, target.scrollTop)
      const horizontalOffset = Math.max(0, target.scrollLeft)

      horizontalOffsetRef.current = horizontalOffset
      verticalOffsetRef.current = verticalOffset

      userOnScroll?.(event)

      setIsScrolling(true)
      if (debounceTime.current) {
        cancelAnimationFrame(debounceTime.current)
      }
      debounceTime.current = requestAnimationFrame(debouncedEnded)
    },
    [debouncedEnded, userOnScroll],
  )

  return [verticalOffsetRef.current, horizontalOffsetRef.current, onScroll] as const
}
