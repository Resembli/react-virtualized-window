import * as React from "react"

export const useWindowDimensions = (windowRef: React.RefObject<HTMLDivElement>) => {
  const windowHeightRef = React.useRef(0)
  const windowWidthRef = React.useRef(0)
  const browserWidth = React.useRef(0)

  const [, forceUpdate] = React.useReducer((x) => (x + 1) % 10, 0)

  React.useEffect(() => {
    if (!windowRef.current || !windowRef.current.parentElement) return

    const resizeObserver = new ResizeObserver(() => {
      if (!windowRef.current || !windowRef.current.parentElement) return

      const parentElement = windowRef.current.parentElement

      const scrollTop = windowRef.current.scrollTop
      const scrollLeft = windowRef.current.scrollLeft

      parentElement.replaceChildren(document.createElement("div"))

      // When width/height is 100%, resizing the element does not work
      // as expected - resizing up works, but resizing down will not be calculated
      // correctly (it doesn't resize at all). Subtracting 1 from the width and height
      // seems to fix this behavior.
      windowWidthRef.current = parentElement.clientWidth - 1
      windowHeightRef.current = parentElement.clientHeight - 1

      let root = parentElement
      while (root.parentElement) root = root.parentElement
      browserWidth.current = root.clientWidth

      parentElement.replaceChildren(windowRef.current)
      windowRef.current.scrollBy({ top: scrollTop, left: scrollLeft })

      // After all effect calculations are complete, we need to force a re-render as the
      // div for the list will have changed height.
      forceUpdate()
    })

    resizeObserver.observe(windowRef.current.parentElement)

    return () => resizeObserver.disconnect()
  }, [windowRef])

  return [windowWidthRef.current, windowHeightRef.current, browserWidth.current] as const
}
