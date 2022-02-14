import Link from "@docusaurus/Link"
import CodeBlock from "@theme/CodeBlock"
import clsx from "clsx"

import styles from "./HomepageFeatures.module.css"

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={clsx("col col--6 col--offset-3")}>
            <div className="text--center">
              <img
                className={styles.featureImg}
                alt="react-virtualized-window svg logo"
                src="/react-virtualized-window.png"
              />
            </div>
            <div
              className={clsx("text--center", "text--bold", "padding-horiz--md", styles.feature)}
            >
              <h3>React Virtualized Window</h3>
              <p>
                Create performant views on your data by virtualizing the DOM with{" "}
                <code>@resembli/react-virtualized-window</code>
              </p>
              <div className={styles.fourFeatureGrid}>
                <div>
                  <span style={{ paddingRight: "0.5rem" }}>🚀</span> React 18 Concurrent Mode
                </div>
                <div>
                  <span style={{ paddingRight: "0.5rem" }}>🤏</span>Tiny {"< 3kb"}
                </div>
                <div>
                  <span style={{ paddingRight: "0.5rem" }}>🔥</span>SSR Ready
                </div>
                <div>
                  <span style={{ paddingRight: "0.5rem" }}>🛠</span> TypeScript Support
                </div>
              </div>
              <CodeBlock metastring="bash">
                npm install @resembli/react-virtualized-window
              </CodeBlock>
              <Link className="button button--primary" to="/docs/react-virtualized-window/">
                See the documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
