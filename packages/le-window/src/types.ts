export interface ListDataItem<T> {
  props: T
  height?: number
  key?: string | number
}

export interface ListHorizontalDataItem<T> {
  props: T
  width?: number
  key?: string | number
}

export interface GridDataItem<T> {
  props: T
  width?: number
  key?: string | number
}

export interface GridDataRow<T> {
  cells: GridDataItem<T>[]
  height?: number
  key?: string | number
}
