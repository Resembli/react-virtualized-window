import * as React from "react"
import type { CSSProperties, PropsWithChildren } from "react"
import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"

import { css, keyframes } from "../css/css"

const openAnimation = keyframes({
  "0%": { height: 0 },
  "100%": { height: "var(--internal_height)" },
})

const closeAnimation = keyframes({
  "0%": { height: "var(--internal_height)" },
  "100%": { height: 0 },
})

const openCss = css({
  animation: `${openAnimation} 200ms linear`,
})

const closeCss = css({
  animation: `${closeAnimation} 200ms linear`,
})

export interface CollapseProps {
  open: boolean
  as?: keyof JSX.IntrinsicElements
  className?: string
  style?: CSSProperties
}

export function Collapse({
  children,
  open,
  className,
  style,
  as = "div",
}: PropsWithChildren<CollapseProps>) {
  const [height, setHeight] = useState(0)
  const [mounted, setMounted] = useState(false)

  const ref = useRef<HTMLUListElement>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    ref.current && setHeight(ref.current.scrollHeight)
  })

  useEffect(() => {
    open && setMounted(open)
  }, [open])

  if (!mounted) return null

  return React.createElement(
    as,
    {
      ref,
      onAnimationEnd: () => {
        !open && setMounted(false)
      },
      className: `${open ? openCss() : closeCss()} ${className ?? ""}`,
      style: {
        height: open ? "auto" : 0,
        overflow: "hidden",
        "--internal_height": `${height}px`,
        ...style,
      },
    },
    children,
  )
}
