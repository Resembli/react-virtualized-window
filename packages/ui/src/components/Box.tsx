import * as React from "react"

import type { ComponentVariants } from "@resembli/variants-types"

import { useVariantCss } from "../providers/VariantProvider"

export type BoxProps = ComponentVariants["Box"]

export function Box(props: BoxProps) {
  const sx = useVariantCss("Box")
  return <div className={sx && sx({ ...(props as Record<string, unknown>) })}>Lee</div>
}
