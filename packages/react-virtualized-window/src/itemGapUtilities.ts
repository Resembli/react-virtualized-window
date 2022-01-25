import type { ItemGap } from "./types"

export function getMarginStyling(itemGap?: ItemGap) {
  if (!itemGap) return {}

  if (typeof itemGap === "number") return { margin: itemGap }

  return {
    marginTop: itemGap.top,
    marginBottom: itemGap.bottom,
    marginLeft: itemGap.left,
    marginRight: itemGap.right,
  }
}

export function getVerticalGap(itemGap?: ItemGap) {
  if (!itemGap) return { top: 0, bottom: 0 }
  if (typeof itemGap === "number") return { top: itemGap, bottom: itemGap }

  return { top: itemGap.top ?? 0, bottom: itemGap.bottom ?? 0 }
}
