import * as React from "react"

interface UseWindowScrollArgs {
  rtl: boolean
  userOnScroll?: React.UIEventHandler<HTMLElement>
}

export const useWindowScroll = ({ userOnScroll, rtl }: UseWindowScrollArgs) => {
  const vOffset = React.useRef(0)
  const hOffset = React.useRef(0)

  const [, forceUpdate] = React.useReducer((x) => (x + 1) % 2, 0)

  const debounceTime = React.useRef<number | null>(null)
  const debounceEnded = React.useCallback(() => {
    debounceTime.current = null
    forceUpdate()
  }, [])

  const onScroll: React.UIEventHandler<HTMLElement> = React.useCallback(
    (event) => {
      const target = event.currentTarget

      const scrollLeft = rtl ? -target.scrollLeft : target.scrollLeft
      const scrollTop = target.scrollTop

      const verticalOffset = Math.max(0, scrollTop)
      const horizontalOffset = Math.max(0, scrollLeft)

      hOffset.current = horizontalOffset
      vOffset.current = verticalOffset

      if (debounceTime.current) {
        cancelAnimationFrame(debounceTime.current)
      }
      debounceTime.current = requestAnimationFrame(debounceEnded)

      userOnScroll?.(event)
    },
    [debounceEnded, rtl, userOnScroll],
  )

  return [vOffset.current, hOffset.current, onScroll] as const
}
