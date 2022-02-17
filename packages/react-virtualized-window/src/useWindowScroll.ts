import * as React from "react"

interface UseWindowScrollArgs {
  rtl: boolean
  transRef: React.RefObject<HTMLDivElement>
  disableSticky?: boolean
  userOnScroll?: React.UIEventHandler<HTMLElement>
}

export const useWindowScroll = ({
  userOnScroll,
  transRef,
  rtl,
  disableSticky,
}: UseWindowScrollArgs) => {
  const vOffset = React.useRef(0)
  const hOffset = React.useRef(0)

  const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
  const debounceRef = React.useRef<number | null>(null)

  const onScroll: React.UIEventHandler<HTMLElement> = React.useCallback(
    (event) => {
      if (!transRef.current) return

      const target = event.currentTarget

      const scrollLeft = rtl ? -target.scrollLeft : target.scrollLeft
      const scrollTop = target.scrollTop

      const verticalOffset = Math.max(0, scrollTop)
      const horizontalOffset = Math.max(0, scrollLeft)

      transRef.current.style.transform = `translate3d(${
        disableSticky ? 0 : rtl ? horizontalOffset : -horizontalOffset
      }px, ${disableSticky ? 0 : -verticalOffset}px, 0px)`

      hOffset.current = horizontalOffset
      vOffset.current = verticalOffset

      if (debounceRef.current) cancelAnimationFrame(debounceRef.current)

      debounceRef.current = requestAnimationFrame(() => forceUpdate())

      userOnScroll?.(event)
    },
    [disableSticky, rtl, transRef, userOnScroll],
  )

  return [vOffset.current, hOffset.current, onScroll] as const
}
