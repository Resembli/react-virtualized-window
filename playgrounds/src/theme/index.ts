import type { MakeComponentVariants } from "@resembli/ui"

import { BoxCss } from "./Box"

export const ComponentVariants = {
  Box: BoxCss,
}

export type Variants = MakeComponentVariants<typeof ComponentVariants>
