import * as React from "react"

export function useSmartSticky(userOverscan?: number, userDisableSticky?: boolean) {
  const [overscan, disableSticky] = React.useMemo(() => {
    const windowWidth = globalThis.innerWidth ?? 1280

    const disableSticky = userDisableSticky == null && windowWidth < 800 ? true : userDisableSticky
    const overscan = userOverscan == null && windowWidth < 800 ? 15 : userOverscan

    return [overscan, disableSticky]
  }, [userDisableSticky, userOverscan])

  return [overscan, disableSticky] as const
}
