import { css } from "./css"

export const commonVariants = css({
  variants: {
    mSpace: {
      dense: { margin: "$0" },
      normal: { margin: "$1" },
      spacious: { margin: "$2" },
      extraSpacious: { margin: "$3" },
    },
    pSpace: {
      dense: { margin: "$0" },
      normal: { margin: "$1" },
      spacious: { margin: "$2" },
      extraSpacious: { margin: "$3" },
    },
  },
})
