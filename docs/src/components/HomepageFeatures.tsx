import Link from "@docusaurus/Link"
import clsx from "clsx"

import styles from "./HomepageFeatures.module.css"

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={clsx("col col--6 col--offset-3")}>
            <div className="text--center">
              <img className={styles.featureSvg} alt="le-window svg logo" src="/le-window.svg" />
            </div>
            <div className="text--center text--bold padding-horiz--md">
              <h3>Le-Window</h3>
              <p>
                Fast window virtualization to render only what is visible to the user. For when you
                need to performantly render massive lists or tables.
              </p>
              <Link className="button button--primary" to="/docs/le-window/">
                Checkout the docs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
