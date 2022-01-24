import { css } from "@stitches/core"
import { Link } from "wouter"

const sidebar = css({
  borderRight: "1px solid black",
})

export function Sidebar() {
  return (
    <div className={sidebar()}>
      <ul>
        <li>
          <Link href="/list-component">
            <a>List Component</a>
          </Link>
        </li>
        <li>
          <Link href="/grid-component">
            <a>Grid Component</a>
          </Link>
        </li>
        <li>
          <Link href="/list-horizontal-component">
            <a>List Horizontal Component</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
