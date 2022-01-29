import { blueDark, cyanDark, indigoDark, mintDark } from "@radix-ui/colors"
import { createStitches } from "@stitches/core"
import type * as Stitches from "@stitches/core"

export const { css, createTheme, globalCss, config } = createStitches({
  theme: {
    colors: {
      ...indigoDark,
      ...blueDark,
      ...cyanDark,
      ...mintDark,

      appBg: "$indigo1",
      subtleBg: "$indigo2",
      subtleBorder: "$indigo6",

      surfaceBg: "$blue3",
      surfaceBorder: "$blue7",

      linkPrimary: "$cyan12",

      textPrimary: "$indigo11",
      textSecondary: "$indigo12",
    },
    fontSizes: {
      nm: "min(calc(12px + 1.0vw), 20px)",
      xs: "min(calc(12px + 1.5vw), 24px)",
      sm: "min(calc(12px + 2.0vw), 32px)",
      md: "min(calc(14px + 2.0vw), 40px)",
      lg: "min(calc(16px + 2.0vw), 48px)",
      xl: "min(calc(20px + 2.0vw), 56px)",
      xxl: "min(calc(24px + 2.0vw), 64px)",
    },
    space: {
      xs: "4px",
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
      xxl: "32px",
    },
  },
})

export type CSS = Stitches.CSS<typeof config>
