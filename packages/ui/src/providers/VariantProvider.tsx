import type { css } from "@stitches/core"
import * as React from "react"

interface ComponentsType {
  Box?: unknown
}

const VariantContext = React.createContext<ComponentsType>({})

export function VariantProvider({
  value,
  children,
}: React.PropsWithChildren<{ value: ComponentsType }>) {
  return <VariantContext.Provider value={value}>{children}</VariantContext.Provider>
}

export function useVariantCss(componentKey: keyof ComponentsType) {
  return React.useContext(VariantContext)[componentKey] as ReturnType<typeof css>
}
