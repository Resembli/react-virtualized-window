import type { PropsWithChildren } from "react"
import { Router, useLocation, useRouter } from "wouter"

export function NestedRoutes(props: PropsWithChildren<{ base: string }>) {
  const router = useRouter()
  const [parentLocation] = useLocation()

  const nestedBase = `${router.base}${props.base}`

  // don't render anything outside of the scope

  if (!parentLocation.startsWith(nestedBase)) return null

  // we need key to make sure the router will remount when base changed
  return (
    <Router base={nestedBase} key={nestedBase}>
      {props.children}
    </Router>
  )
}
