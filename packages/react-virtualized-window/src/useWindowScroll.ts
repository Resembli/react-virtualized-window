import * as React from "react"

interface UseWindowScrollArgs {
  rtl: boolean
  userOnScroll?: React.UIEventHandler<HTMLElement>
}

export const useWindowScroll = ({ userOnScroll, rtl }: UseWindowScrollArgs) => {
  const [vOffset, setVerticalOffset] = React.useState(0)
  const [hOffset, setHorizontalOffset] = React.useState(0)

  const onScroll: React.UIEventHandler<HTMLElement> = React.useCallback(
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
