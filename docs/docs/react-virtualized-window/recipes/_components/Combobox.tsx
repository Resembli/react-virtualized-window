import { useColorMode } from "@docusaurus/theme-common"
import { useCombobox } from "downshift"
import { useState } from "react"

import { List } from "@resembli/react-virtualized-window"

import { words } from "./words"

const centerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

export function DropdownCombobox() {
  const { isDarkTheme } = useColorMode()
  const [inputItems, setInputItems] = useState(words)
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(words.filter((item) => item.toLowerCase().startsWith(inputValue.toLowerCase())))
    },
  })
  return (
    <div>
      <label {...getLabelProps()}>Choose an element:</label>
      <div {...getComboboxProps()}>
        <input {...getInputProps()} style={{ width: 180 }} />
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label="toggle menu"
          style={{ width: 20 }}
        >
          &#8595;
        </button>
      </div>
      <ul {...getMenuProps()} style={{ padding: 0, listStyle: "none", position: "relative" }}>
        {isOpen && (
          <div
            style={{
              height: 300,
              width: 200,
              border: "1px solid grey",
              position: "absolute",
              background: isDarkTheme ? "black" : "white",
            }}
          >
            <List data={inputItems} defaultSize={25}>
              {({ data, style, cellMeta: { row } }) => {
                return (
                  <li
                    style={
                      highlightedIndex === row
                        ? { backgroundColor: "#317bb1", ...centerStyles, ...style }
                        : { ...centerStyles, ...style }
                    }
                    key={`${data}${row}`}
                    {...getItemProps({ item: data, index: row })}
                  >
                    {data}
                  </li>
                )
              }}
            </List>
          </div>
        )}
      </ul>
    </div>
  )
}
