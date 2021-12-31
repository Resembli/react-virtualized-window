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
              <img className={styles.featureImg} alt="le-window svg logo" src="/le-window.png" />
            </div>
            <div
              className={clsx("text--center", "text--bold", "padding-horiz--md", styles.feature)}
            >
              <h3>Le-Window</h3>
              <p>
                React virtualization for performant rendering of large lists or massive amounts of
                tabular data.
              </p>
              <CodeBlock metastring="bash">npm install @resembli/le-window</CodeBlock>
              <Link className="button button--primary" to="/docs/le-window/">
                Getting Started and Docs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
