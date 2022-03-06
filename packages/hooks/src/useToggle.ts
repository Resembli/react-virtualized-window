import { useCallback, useState } from "react"

export function useToggle(initial = false) {
  const [value, setToggle] = useState(initial)
  const toggle = useCallback(() => setToggle((prev) => !prev), [])

  return [value, toggle] as const
}
