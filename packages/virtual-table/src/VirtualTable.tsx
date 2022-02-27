import React, { useCallback, useMemo, useState } from "react"

export interface VirtGridProps {
  rows: Record<string, string | number>[]
  rowHeight: number
  tableHeight?: number
}

export const VirtualTable = ({
  rows,
  rowHeight,
  tableHeight = 400,
}: VirtGridProps): React.ReactElement => {
  const columns = useMemo(() => {
    return Object.keys(rows[0])
  }, [rows])

  const [scrollState, setScrollState] = useState({
    top: 0,
    index: 0,
    end: Math.ceil(tableHeight * 2) / rowHeight,
  })

  const onScrollHandler = useCallback(
    (e: React.UIEvent<HTMLElement, UIEvent>) => {
      const scrollTop = e.currentTarget.scrollTop
      const index = Math.floor(scrollTop / rowHeight)

      const newScrollState = {
        index,
        end: index + Math.ceil((tableHeight * 2) / rowHeight),
        top: (scrollTop / rowHeight) * rowHeight,
      }

      setScrollState(newScrollState)
    },
    [rowHeight, tableHeight],
  )

  const generateRows = useCallback(() => {
    const { end } = scrollState
    const items = []
    let index = scrollState.index

    do {
      if (index >= rows.length) {
        index = rows.length
        break
      }

      const rowAttributes = {
        style: {
          position: "absolute" as const,
          top: index * rowHeight,
          left: 0,
          height: rowHeight,
          lineHeight: `${rowHeight}px`,
        },
      }

      items.push(
        <tr key={index} {...rowAttributes}>
          {columns.map((column, i) => (
            <td key={i}>{rows[index][column]}</td>
          ))}
        </tr>,
      )

      index++
    } while (index < end)

    return items
  }, [columns, rowHeight, rows, scrollState])

  return (
    <div style={{ margin: 10, display: "inline-block" }}>
      <table style={{ borderStyle: "none" }}>
        <thead>
          <tr style={{ height: rowHeight, maxHeight: rowHeight }}>
            {columns.map((name, key) => (
              <th key={key}>{name}</th>
            ))}
          </tr>
        </thead>
      </table>
      <table
        onScroll={onScrollHandler}
        style={{
          height: tableHeight,
          overflowY: "scroll",
          borderCollapse: "collapse",
          display: "block",
        }}
      >
        <tbody
          style={{
            position: "relative",
            display: "inline-block",
            height: rowHeight * rows.length,
            maxHeight: rowHeight * rows.length,
            width: "100%",
          }}
        >
          {generateRows()}
        </tbody>
      </table>
    </div>
  )
}
