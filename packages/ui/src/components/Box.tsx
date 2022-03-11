import * as React from "react"

import type { ComponentVariants } from "@resembli/variants-types"

export type BoxProps = {
  as?: string
} & ComponentVariants["Box"]

export function Box(props: BoxProps) {
  console.log(props)
  return <div>Lee</div>
}
