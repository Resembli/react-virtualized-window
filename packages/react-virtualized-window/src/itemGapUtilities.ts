import type { ItemGap } from "./types"

export function getMarginStyling(itemGap?: ItemGap) {
  if (!itemGap) return { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 }

  if (typeof itemGap === "number")
    return { marginTop: itemGap, marginBottom: itemGap, marginLeft: itemGap, marginRight: itemGap }

  return {
    marginTop: itemGap.top ?? 0,
    marginBottom: itemGap.bottom ?? 0,
    marginLeft: itemGap.left ?? 0,
    marginRight: itemGap.right ?? 0,
  }
}

export function getVerticalMarginStyling(itemGap?: ItemGap) {
  if (!itemGap) return { marginTop: 0, marginBottom: 0 }
  if (typeof itemGap === "number") return { marginTop: itemGap, marginBottom: itemGap }

  return { marginTop: itemGap.top ?? 0, marginBottom: itemGap.bottom ?? 0 }
}

export function getHorizontalMarginStyling(itemGap?: ItemGap, isLastItem?: boolean) {
  if (!itemGap) return { marginLeft: 0, marginRight: 0 }
  if (typeof itemGap === "number")
    return { marginLeft: itemGap, marginRight: isLastItem ? itemGap : 0 }

  return { marginLeft: itemGap.left ?? 0, marginRight: itemGap.right ?? 0 }
}

export function getVerticalGap(itemGap?: ItemGap) {
  if (!itemGap) return { top: 0, bottom: 0 }
  if (typeof itemGap === "number") return { top: itemGap, bottom: itemGap }

  return { top: itemGap.top ?? 0, bottom: itemGap.bottom ?? 0 }
}

export function getHorizontalGap(itemGap?: ItemGap) {
  if (!itemGap) return { left: 0, right: 0 }
  if (typeof itemGap === "number") return { left: itemGap, right: itemGap }

  return { left: itemGap.left ?? 0, right: itemGap.right ?? 0 }
}
