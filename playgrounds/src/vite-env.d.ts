/// <reference types="vite/client" />
import type { Variants } from "./theme"

declare module "@resembli/variants-types" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ComponentVariants extends Variants {}
}
