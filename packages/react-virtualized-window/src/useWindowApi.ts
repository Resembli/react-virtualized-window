import type { MutableRefObject, RefObject } from "react"
import { useEffect } from "react"

export interface VirtualWindowApi {
  scroll: HTMLDivElement["scroll"]
  scrollTo: HTMLDivElement["scrollTo"]
  scrollBy: HTMLDivElement["scrollBy"]
  scrollTop: HTMLDivElement["scrollTop"]
  scrollLeft: HTMLDivElement["scrollLeft"]
}

export const useWindowApi = (
  windowRef: RefObject<HTMLDivElement>,
  windowApiRef?: MutableRefObject<VirtualWindowApi | undefined>,
) => {
  useEffect(() => {
    if (!windowRef.current || !windowApiRef) return

    // We need to bind the scroll functions to the window element to avoid illegal invocation errors
    const scroll = windowRef.current.scroll.bind(windowRef.current)
    const scrollTo = windowRef.current.scrollTo.bind(windowRef.current)
    const scrollBy = windowRef.current.scrollBy.bind(windowRef.current)
    const scrollTop = windowRef.current.scrollLeft
    const scrollLeft = windowRef.current.scrollLeft

    windowApiRef.current = { scroll, scrollTo, scrollBy, scrollTop, scrollLeft }
  }, [windowApiRef, windowRef])
}
