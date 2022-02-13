import type { UIEventHandler } from "react"
import { useCallback, useState } from "react"

import { List } from "@resembli/react-virtualized-window"

export function InfiniteScroller() {
  const [data, setData] = useState(Array.from({ length: 500 }, (_, i) => i))

  const [isLoading, setIsLoading] = useState(false)

  const onScroll = useCallback<UIEventHandler>(
    (e) => {
      const distanceToBottom =
        e.currentTarget.scrollHeight - e.currentTarget.scrollTop - e.currentTarget.clientHeight

      if (distanceToBottom < 5000 && !isLoading) {
        setIsLoading(true)
        new Promise<void>((res) => {
          setTimeout(() => {
            setData((prev) => [...prev, ...Array.from({ length: 500 }, (_, i) => i + prev.length)])
            setIsLoading(false)
            res()
          }, 1000)
        })
      }
    },
    [isLoading],
  )

  return (
    <div style={{ height: 500 }}>
      <List defaultSize={50} data={data} onScroll={onScroll}>
        {({ data, style }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid grey",
              boxSizing: "border-box",
              ...style,
            }}
          >
            {data}
          </div>
        )}
      </List>
    </div>
  )
}
