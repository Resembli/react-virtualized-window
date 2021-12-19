import { useEffect, useMemo, useRef, useState } from "react"

export interface WindowProps {
  width: number
  height: number
  rowHeight: number
  data: any[] // TODO: type is better
}

export const Window = ({ width, height, rowHeight, data }: WindowProps) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const topShiftRef = useRef<HTMLDivElement>(null)

  const windowHeight = useRef(0)
  const windowWidth = useRef(0)
  const [offset, setOffset] = useState(0)

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
        innerHeight - windowHeight.current,
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
    if (!overlayRef.current || !windowRef.current) return

    windowWidth.current = overlayRef.current.clientWidth
    windowHeight.current = overlayRef.current.clientHeight

    windowRef.current.style.width = `${windowWidth.current}px`
    windowRef.current.style.height = `${windowHeight.current}px`
  }, [])

  const [start, end, topShiftHeight] = useMemo(() => {
    const itemsPerWindow = Math.ceil(height / rowHeight)

    const startIndex = Math.floor(offset / rowHeight)
    const endIndex = itemsPerWindow + startIndex

    const topShiftHeight = startIndex * rowHeight

    return [startIndex, endIndex, topShiftHeight] as const
  }, [height, offset, rowHeight])

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={overlayRef}
        style={{
          position: "relative",
          boxSizing: "border-box",
          width: width,
          height: height,
          border: "1px solid black",
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
              <div key={i} style={{ height: rowHeight }}>
                {d}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
