import type { ReactNode } from "react"

type AppProps = {
  Component: ReactNode
}

function App({ Component }: AppProps) {
  // @ts-ignore
  return <Component />
}

App.displayName = "VitebookApp"

export default App
