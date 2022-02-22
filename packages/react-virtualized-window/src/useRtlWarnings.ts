import * as React from "react"

interface UseRTLWarningsArgs {
  rtl?: boolean
  disableSticky?: boolean
  pinnedLeft?: unknown
  pinnedRight?: unknown
}

export function useRTLWarnings({
  rtl,
  disableSticky,
  pinnedLeft,
  pinnedRight,
}: UseRTLWarningsArgs) {
  React.useEffect(() => {
    if (!rtl) return

    if (!disableSticky)
      console.warn(
        "[react-virtualized-window]: RTL with stickEnabled does not work on IOS touch devices. Consider setting disableSticky to false",
      )

    if (pinnedLeft || pinnedRight)
      console.warn(
        "[react-virtualized-window]: RLT with pinned columns does not work on IOS touch devices. Consider removing the pinned columns",
      )
  }, [disableSticky, pinnedLeft, pinnedRight, rtl])
}
