/// <reference types="vite/client" />
import type { VarsType } from "./VariantTest"

declare module "@resembli/variants-types" {
  export interface ComponentVariants extends VarsType {
    _: unknown
  }
}
