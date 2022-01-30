import type { RefObject } from "react"
import { useEffect, useReducer, useRef } from "react"

export const useWindowDimensions = (windowRef: RefObject<HTMLDivElement>) => {
  const windowHeightRef = useRef(0)
  const windowWidthRef = useRef(0)

  const [, forceUpdate] = useReducer((x) => (x + 1) % 10, 0)

  useEffect(() => {
    if (!windowRef.current || !windowRef.current.parentElement) return

    const resizeObserver = new ResizeObserver(() => {
      if (!windowRef.current || !windowRef.current.parentElement) return

      const parentElement = windowRef.current.parentElement
      parentElement.replaceChildren(document.createElement("div"))

      windowWidthRef.current = parentElement.clientWidth - 1
      windowHeightRef.current = parentElement.clientHeight - 1

      parentElement.replaceChildren(windowRef.current)

      // After all effect calculations are complete, we need to force a re-render as the
      // div for the list will have changed height.
      forceUpdate()
    })

    resizeObserver.observe(windowRef.current.parentElement)

    return () => resizeObserver.disconnect()
  }, [windowRef])

  return [windowWidthRef.current, windowHeightRef.current] as const
}
