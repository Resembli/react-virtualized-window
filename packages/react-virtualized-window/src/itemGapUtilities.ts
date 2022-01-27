import type { ItemGap } from "./types"

export function getVerticalMarginStyling(itemGap?: ItemGap) {
  if (!itemGap) return { marginTop: 0, marginBottom: 0 }

  const gap = getVerticalGap(itemGap)

  return { marginTop: gap, marginBottom: gap }
}

export function getHorizontalMarginStyling(itemGap?: ItemGap, isLastItem?: boolean) {
  if (!itemGap) return { marginLeft: 0, marginRight: 0 }

  const gap = getHorizontalGap(itemGap)

  return {
    marginLeft: gap,
    marginRight: isLastItem ? gap : 0,
  }
}

export function getVerticalGap(itemGap?: ItemGap) {
  return typeof itemGap === "number" ? itemGap : itemGap?.vertical ?? 0
}

export function getHorizontalGap(itemGap?: ItemGap) {
  return typeof itemGap === "number" ? itemGap : itemGap?.horizontal ?? 0
}
