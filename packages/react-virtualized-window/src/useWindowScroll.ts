import type { RefObject, UIEventHandler } from "react"
import { useRef } from "react"
import { useCallback, useState } from "react"

interface UseWindowScrollArgs {
  translationRef: RefObject<HTMLDivElement>
  x: boolean
  y: boolean
  rtl: boolean
  userOnScroll?: UIEventHandler<HTMLElement>
}

export const useWindowScroll = ({
  userOnScroll,
  rtl,
  translationRef,
  x,
  y,
}: UseWindowScrollArgs) => {
  const verticalOffsetRef = useRef(0)
  const horizontalOffsetRef = useRef(0)

  const [isScrolling, setIsScrolling] = useState(false)

  const debounceTime = useRef<number | null>(null)

  const debouncedEnded = useCallback(() => {
    debounceTime.current = null
    setIsScrolling(false)
  }, [])

  const onScroll: UIEventHandler<HTMLElement> = useCallback(
    (event) => {
      if (!translationRef.current) return

      const target = event.currentTarget

      const scrollLeft = rtl ? -target.scrollLeft : target.scrollLeft
      const scrollTop = target.scrollTop

      translationRef.current.style.willChange = "transform"
      translationRef.current.style.transform = `translate3d(${x && !rtl ? -scrollLeft : 0}px, ${
        y ? -scrollTop : 0
      }px, 0)`

      const verticalOffset = Math.max(0, scrollTop)
      const horizontalOffset = Math.max(0, scrollLeft)

      horizontalOffsetRef.current = horizontalOffset
      verticalOffsetRef.current = verticalOffset

      userOnScroll?.(event)

      setIsScrolling(true)
      if (debounceTime.current) {
        cancelAnimationFrame(debounceTime.current)
      }
      debounceTime.current = requestAnimationFrame(debouncedEnded)
    },
    [debouncedEnded, rtl, translationRef, userOnScroll, x, y],
  )

  return [verticalOffsetRef.current, horizontalOffsetRef.current, onScroll, isScrolling] as const
}
