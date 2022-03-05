import { AnimatePresence, motion } from "framer-motion"
import * as React from "react"

export interface CollapseProps {
  open?: boolean
  as?: keyof typeof motion
}

export function Collapse({ open, children, as = "div" }: React.PropsWithChildren<CollapseProps>) {
  const MotionElement = motion[as]

  return (
    <AnimatePresence initial={false}>
      {open && (
        <MotionElement
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          transition={{ duration: 0.2 }}
          style={{ overflow: "hidden" }}
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
