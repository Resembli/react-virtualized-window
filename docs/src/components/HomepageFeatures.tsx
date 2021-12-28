import Link from "@docusaurus/Link"
import clsx from "clsx"

import styles from "./HomepageFeatures.module.css"

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={clsx("col col--4 col--offset-4")}>
            <div className="text--center">
              <img className={styles.featureSvg} alt="le-window svg logo" src="/le-window.svg" />
            </div>
            <div className="text--center text--bold padding-horiz--md">
              <h3>Le-Window</h3>
              <p>
                Fast rendering virtualization to render only what is visible to the user. For when
                you need to render massive lists or tabular data
              </p>
              <Link className="button button--primary">Checkout the docs</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
