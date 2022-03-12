import { css, styled } from "@stitches/react"

import { Grid } from "@resembli/ui"
import { VariantProvider } from "@resembli/ui/src/providers/VariantProvider"

import { ComponentVariants } from "./theme"

const B = css({
  variants: {
    outlined: {
      true: { border: "1px solid black" },
    },
  },
})

const Button = styled("button", B, {})

function App() {
  return (
    <VariantProvider value={ComponentVariants}>
      <Grid layout="shell">
        <Button />
        <div style={{ gridArea: "nav" }}>Nav</div>
        <div>Sidebar</div>
        <div>App</div>
        <div>Control</div>
      </Grid>
    </VariantProvider>
  )
}

export default App
