import type { NumberOrPercent } from "./types.js"

export function percentToNumber(percent: string) {
  return parseFloat(percent) / 100.0
}

export function dimToNumber(dim: NumberOrPercent, windowDim: number) {
  return typeof dim === "string" ? percentToNumber(dim) * windowDim : dim
}
