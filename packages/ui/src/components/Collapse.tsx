import * as React from "react"

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
  style?: React.CSSProperties
}

export function Collapse({
  children,
  open,
  className,
  style,
  as = "div",
}: React.PropsWithChildren<CollapseProps>): JSX.Element | null {
  const [height, setHeight] = React.useState(0)
  const [mounted, setMounted] = React.useState(false)

  const ref = React.useRef<HTMLUListElement>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    ref.current && setHeight(ref.current.scrollHeight)
  })

  React.useEffect(() => {
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
