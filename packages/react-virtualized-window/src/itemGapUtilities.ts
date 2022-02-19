import type { ItemGap } from "./types"

export function getVerticalGap(itemGap?: ItemGap) {
  return typeof itemGap === "number" ? itemGap : itemGap?.vertical ?? 0
}

export function getHorizontalGap(itemGap?: ItemGap) {
  return typeof itemGap === "number" ? itemGap : itemGap?.horizontal ?? 0
}
