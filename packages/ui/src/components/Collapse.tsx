import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"

export interface CollapseProps {
  open?: boolean
  className?: string
  style?: React.CSSProperties
  as?: keyof typeof motion
}

export function Collapse({
  open,
  children,
  as = "div",
  className,
  style,
}: React.PropsWithChildren<CollapseProps>) {
  const MotionElement = motion[as]

  return (
    <AnimatePresence initial={false}>
      {open && (
        <MotionElement
          className={className}
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          transition={{ duration: 0.2 }}
          style={{ overflow: "hidden", ...style }}
          variants={{
            open: { height: "auto" },
            collapsed: { height: 0 },
          }}
        >
          {children}
        </MotionElement>
      )}
    </AnimatePresence>
  )
}
