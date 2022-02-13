import BrowserOnly from "@docusaurus/BrowserOnly"
import { usePrismTheme } from "@docusaurus/theme-common"
import useIsBrowser from "@docusaurus/useIsBrowser"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"

import styles from "./styles.module.css"

function LivePreviewLoader() {
  // Is it worth improving/translating?
  return <div>Loading...</div>
}

function Result() {
  return (
    <>
      {/* https://github.com/facebook/docusaurus/issues/5747 */}
      <div className={styles.playgroundPreview}>
        <BrowserOnly fallback={<LivePreviewLoader />}>
          {() => (
            <>
              <LivePreview />
              <LiveError />
            </>
          )}
        </BrowserOnly>
      </div>
    </>
  )
}

function ThemedLiveEditor() {
  const isBrowser = useIsBrowser()
  return (
    <LiveEditor
      // We force remount the editor on hydration,
      // otherwise dark prism theme is not applied
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      key={isBrowser}
      className={styles.playgroundEditor}
    />
  )
}

export default function Playground({ children, transformCode, ...props }) {
  const prismTheme = usePrismTheme()

  return (
    <div className={styles.playgroundContainer}>
      <LiveProvider
        code={children.replace(/\n$/, "")}
        transformCode={transformCode || ((code) => `${code};`)}
        theme={prismTheme}
        {...props}
      >
        <Result />
        <details className={styles.detailsTransition}>
          <summary className={styles.playgroundHeader}>Live Editor</summary>
          <div>
            <ThemedLiveEditor />
          </div>
        </details>
      </LiveProvider>
    </div>
  )
}
