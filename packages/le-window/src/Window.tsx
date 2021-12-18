import { useEffect, useRef } from "react"

export interface WindowProps {
  width: number | string
  height: number | string
  rowHeight: number
}

export const Window = ({ width, height, rowHeight }: WindowProps) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const topShiftRef = useRef<HTMLDivElement>(null)

  const windowHeight = useRef(0)
  const windowWidth = useRef(0)

  const offsetRef = useRef(0)

  // TODO: Link up on wheel event and keep scroll state in sync
  // TODO: Test out row virtualisation
  // TODO: Add handling for variable size rows
  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (!topShiftRef.current || !contentRef.current) return

      const target = event.currentTarget as HTMLDivElement

      offsetRef.current = target.scrollTop
      topShiftRef.current.style.height = `${offsetRef.current}px`
      contentRef.current.style.transform = `translate3d(0px, -${offsetRef.current}px, 0px)`
    }

    const handleWheel = (event: WheelEvent) => {
      if (!contentRef.current || !overlayRef.current || !topShiftRef.current) return

      offsetRef.current = Math.max(0, offsetRef.current + event.deltaY)
      overlayRef.current.scrollTop = offsetRef.current

      topShiftRef.current.style.height = `${offsetRef.current}px`
      contentRef.current.style.transform = `translate3d(0px, -${offsetRef.current}px, 0px)`
    }

    const overlayNode = overlayRef.current
    const contentNode = contentRef.current

    overlayNode?.addEventListener("scroll", handleScroll)
    contentNode?.addEventListener("wheel", handleWheel)

    return () => {
      overlayNode?.removeEventListener("scroll", handleScroll)
      contentNode?.removeEventListener("wheel", handleWheel)
    }
  }, [])

  useEffect(() => {
    if (!overlayRef.current || !windowRef.current) return

    windowWidth.current = overlayRef.current.clientWidth
    windowHeight.current = overlayRef.current.clientHeight

    windowRef.current.style.width = `${windowWidth.current}px`
    windowRef.current.style.height = `${windowHeight.current}px`
  }, [])

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={overlayRef}
        style={{
          position: "relative",
          boxSizing: "border-box",
          width: width,
          height: height,
          border: "1px solid white",
          overflow: "auto",
        }}
      >
        <div style={{ width: 1000, height: 5000 }}></div>
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
          <div ref={topShiftRef}></div>
        </div>
      </div>
    </div>
  )
}
