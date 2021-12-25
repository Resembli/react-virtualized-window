import type { RefObject } from "react"
import { useRef } from "react"
import { useEffect } from "react"

interface UseRtlScrollOffsetEffectArgs {
  windowRef: RefObject<HTMLElement>
  rtl: boolean
  width: number
  innerWidth: number
}

const usePrevious = <T>(value: T): T | null => {
  const previousRef = useRef<T | null>(null)

  useEffect(() => {
    previousRef.current = value
  })

  return previousRef.current
}

// Stick positioning with rtl does not work as expected on IOS devices. Instead we adjust
// the behavior of ltr scrolling (horizontal only) to behave like it's an rtl scroll. We
// do this by pushing the scroll to the end. We also have to reverse the data given by the
// user - this is done in useData
export const useRtlScrollOffsetEffect = ({
  width,
  windowRef,
  rtl,
  innerWidth,
}: UseRtlScrollOffsetEffectArgs) => {
  const previousRtl = usePrevious(rtl)

  useEffect(() => {
    // We only need to update the scroll if we are changing from rtl to scroll end.
    if (!windowRef.current || previousRtl === rtl) return

    const scrollWidth = innerWidth - width

    if (!rtl) windowRef.current.scrollTo({ left: 0 })
    else windowRef.current.scrollTo({ left: scrollWidth })
  }, [innerWidth, previousRtl, rtl, width, windowRef])
}
