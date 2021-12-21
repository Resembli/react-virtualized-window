import type { UIEventHandler } from "react"
import { useCallback, useState } from "react"

export const useWindowScroll = () => {
  const [offset, setOffset] = useState(0)
  const onScroll: UIEventHandler<HTMLDivElement> = useCallback((event) => {
    const target = event.currentTarget

    const newOffset = target.scrollTop
    setOffset(newOffset)
  }, [])

  return [offset, onScroll] as const
}
