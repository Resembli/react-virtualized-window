import { Box } from "@resembli/ui"
import { VariantProvider } from "@resembli/ui/src/providers/VariantProvider"

import { ComponentVariants } from "./theme"

function App() {
  return (
    <VariantProvider value={ComponentVariants}>
      <div className="App">
        <Box pSpace="dense" align="center" justify="center" />
      </div>
    </VariantProvider>
  )
}

export default App
