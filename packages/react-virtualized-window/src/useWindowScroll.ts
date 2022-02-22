import * as React from "react"

interface UseWindowScrollArgs {
  rtl: boolean
  userOnScroll?: React.UIEventHandler<HTMLElement>
}

export const useWindowScroll = ({ userOnScroll, rtl }: UseWindowScrollArgs) => {
  const vOffset = React.useRef(0)
  const hOffset = React.useRef(0)

  const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
  const debounceRef = React.useRef<number | null>(null)

  const onScroll: React.UIEventHandler<HTMLElement> = React.useCallback(
    (event) => {
      const target = event.currentTarget

      const scrollLeft = rtl ? -target.scrollLeft : target.scrollLeft
      const scrollTop = target.scrollTop

      const verticalOffset = Math.max(0, scrollTop)
      const horizontalOffset = Math.max(0, scrollLeft)

      hOffset.current = horizontalOffset
      vOffset.current = verticalOffset

      if (debounceRef.current) cancelAnimationFrame(debounceRef.current)

      debounceRef.current = requestAnimationFrame(() => forceUpdate())

      userOnScroll?.(event)
    },
    [rtl, userOnScroll],
  )

  return [vOffset.current, hOffset.current, onScroll] as const
}
