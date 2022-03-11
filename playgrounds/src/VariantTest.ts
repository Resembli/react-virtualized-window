import type { ExtractVariant } from "@resembli/ui"
import { css } from "@resembli/ui"

const BoxCss = css({
  variants: {
    flex: {
      true: { display: "flex" },
    },
  },
})

const FlexCss = css({
  variants: {
    lee: {
      true: { display: "block" },
    },
    bob: {
      x: { alignItems: "center" },
      y: { alignContent: "center" },
    },
  },
})

const Vars = {
  Box: BoxCss,
  Flex: FlexCss,
}

type MakeVariants<T extends { Box: unknown }> = {
  [k in keyof T]: ExtractVariant<T[k]>
}

export type VarsType = MakeVariants<typeof Vars>
