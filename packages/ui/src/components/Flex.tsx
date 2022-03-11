import * as React from "react"

import type { ComponentVariants } from "@resembli/variants-types"

export type FlexProps = {
  as?: string
} & ComponentVariants["Flex"]

export function Flex(props: FlexProps) {
  console.log(props)
  return <div>Flex</div>
}
