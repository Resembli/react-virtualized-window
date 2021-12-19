import { useEffect, useMemo, useReducer, useRef, useState } from "react"

export interface WindowProps<T> {
  rowHeight: number
  data: T[]
  ItemComponent: (props: T) => JSX.Element
}

export const Window = <T extends Record<string, unknown>>({
  rowHeight,
  data,
  ItemComponent,
}: WindowProps<T>) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const topShiftRef = useRef<HTMLDivElement>(null)
  const windowHeightRef = useRef(0)
  const windowWidthRef = useRef(0)

  const [offset, setOffset] = useState(0)
  const [, forceUpdate] = useReducer((x) => (x + 1) % 10, 0)

  const innerHeight = useMemo(() => rowHeight * data.length, [data.length, rowHeight])

  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (!topShiftRef.current || !contentRef.current) return

      const target = event.currentTarget as HTMLDivElement

      const newOffset = target.scrollTop

      setOffset(newOffset)
      // topShiftRef.current.style.height = `${newOffset}px`
      contentRef.current.style.transform = `translate3d(0px, -${newOffset}px, 0px)`
    }

    const handleWheel = (event: WheelEvent) => {
      if (!contentRef.current || !overlayRef.current || !topShiftRef.current) return

      const newOffset = Math.min(
        Math.max(0, offset + event.deltaY),
        innerHeight - windowHeightRef.current,
      )
      setOffset(newOffset)

      overlayRef.current.scrollTop = newOffset
      contentRef.current.style.transform = `translate3d(0px, -${newOffset}px, 0px)`
    }

    const overlayNode = overlayRef.current
    const contentNode = contentRef.current

    overlayNode?.addEventListener("scroll", handleScroll)
    contentNode?.addEventListener("wheel", handleWheel)

    return () => {
      overlayNode?.removeEventListener("scroll", handleScroll)
      contentNode?.removeEventListener("wheel", handleWheel)
    }
  }, [innerHeight, offset])

  useEffect(() => {
    if (!overlayRef.current) return

    const parentWidth = overlayRef.current.parentElement?.clientWidth
    const parentHeight = overlayRef.current.parentElement?.clientHeight

    if (!parentWidth || !parentHeight)
      throw new Error("Expected overlay div to have a parent element")

    overlayRef.current.style.width = `${parentWidth}px`
    overlayRef.current.style.height = `${parentHeight}px`
  }, [])

  useEffect(() => {
    if (!overlayRef.current || !windowRef.current) return

    windowWidthRef.current = overlayRef.current.clientWidth
    windowHeightRef.current = overlayRef.current.clientHeight

    windowRef.current.style.width = `${windowWidthRef.current}px`
    windowRef.current.style.height = `${windowHeightRef.current}px`

    // After all effect calculations are complete, we need to force a re-render as the
    // div for the list will have changed height.
    forceUpdate()
  }, [])

  // TODO: These calculations are for fixed size row heights. It will need to adjusted for variable size row heights.
  const itemsPerWindow = Math.ceil(windowHeightRef.current / rowHeight)

  const start = Math.floor(offset / rowHeight)
  const end = itemsPerWindow + start

  const topShiftHeight = start * rowHeight

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={overlayRef}
        style={{
          position: "relative",
          boxSizing: "border-box",
          overflow: "auto",
        }}
      >
        <div style={{ height: innerHeight }}></div>
      </div>
      <div
        ref={windowRef}
        style={{
          position: "absolute",
          top: 0,
          overflow: "hidden",
        }}
        onClick={() => console.log("I was clicked")}
      >
        <div ref={contentRef} style={{ width: "100%", height: "100%" }}>
          <div ref={topShiftRef} style={{ height: topShiftHeight }}></div>
          {data.slice(start, end + 1).map((d, i) => {
            return (
              <div
                key={i}
                style={{ height: rowHeight, maxHeight: rowHeight, minHeight: rowHeight }}
              >
                <ItemComponent {...d} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
