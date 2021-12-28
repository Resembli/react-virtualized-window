import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"

import HomepageFeatures from "../components/HomepageFeatures"
import styles from "./index.module.css"

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  return (
    <Layout title="Home" description="Description will go into a meta tag in <head />">
      <div className="main-container">
        <div className="bg"></div>
        <div className="bg bg2"></div>

        <HomepageHeader />
        <main className={styles.section}>
          <HomepageFeatures />
        </main>
      </div>
    </Layout>
  )
}
