import type { MakeComponentVariants } from "@resembli/ui"

import { BoxCss, GridCss } from "./Layout"

export const ComponentVariants = {
  Box: BoxCss,
  Grid: GridCss,
}

export type Variants = MakeComponentVariants<typeof ComponentVariants>
