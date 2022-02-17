import * as React from "react"

export function useSmartSticky(
  browserWidth: number,
  userOverscan?: number,
  userDisableSticky?: boolean,
) {
  const [overscan, disableSticky] = React.useMemo(() => {
    const disableSticky = userDisableSticky == null && browserWidth < 800 ? true : userDisableSticky
    const overscan = userOverscan == null && browserWidth < 800 ? 15 : userOverscan

    return [overscan, disableSticky]
  }, [browserWidth, userDisableSticky, userOverscan])

  return [overscan, disableSticky] as const
}
