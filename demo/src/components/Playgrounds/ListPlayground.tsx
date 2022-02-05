import type { UIEventHandler } from "react"
import { useCallback, useState } from "react"
import { useEffect, useRef } from "react"

import type { VirtualWindowApi } from "@resembli/react-virtualized-window"
import { List } from "@resembli/react-virtualized-window"

import { debounce } from "../../debouce"
import { css } from "../../theme/theme"

const itemClass = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "$blue4",
  variants: {
    odd: {
      true: { backgroundColor: "$mint3", color: "$mint11" },
    },
  },
})

const createData = () =>
  Array(1000)
    .fill(0)
    .map(() => performance.now().toFixed(2))

export function ListPlayground() {
  const apiRef = useRef<VirtualWindowApi>()

  useEffect(() => {
    apiRef.current?.scrollTo({ top: 5000 })
  }, [])

  const [data, setData] = useState(createData())

  const updateData = useCallback(() => {
    setData((prev) => [...createData(), ...prev])
    apiRef.current?.scrollTo({ top: 5000 })
  }, [])

  const handleOnScroll: UIEventHandler<HTMLElement> = (e) => {
    const offset = e.currentTarget.scrollTop

    if (offset < 1000) {
      debounce(updateData, 10_000)
    }
  }

  return (
    <List data={data} defaultRowHeight={50} apiRef={apiRef} onScroll={handleOnScroll}>
      {(props, style, { row }) => {
        const clx = itemClass({ odd: row % 2 === 1 })
        return (
          <div style={style} className={clx}>
            {props + 1}
          </div>
        )
      }}
    </List>
  )
}
