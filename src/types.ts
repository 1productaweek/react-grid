import { MutableRefObject } from 'react'
import { Index } from 'react-virtualized'

export interface BaseProps {
  rowHeight: number
  totalWidth: number
  scrollLeft: number
  overscanColumnCount?: number
  columnCount: number
}

export interface GridProps extends BaseProps {
  isLoading: boolean
  readOnly: boolean
  noHeader: boolean

  gutterWidth: number
  gutterOffset?: number

  onRowsChange: (change: {
    fromRow: number
    toRow: number
    updated: Record<string, any>
  }) => void
  rowCount: number
  rowHeight: number
  rowMenu: MenuItem[]
  overscanRowCount?: number
  rowGetter: (rowIndex: number) => Record<string, any>
  onAddRow: (count: number) => void
  onRowClick: (columnIndex: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void

  columns: Column[]
  columnMenu?: MenuItem[]
  estimatedColumnWidth?: number
  overscanColumnCount?: number
  onColumnResize?: (columnIndex: number, offset: number) => void
  onAddColumn?: (count: number) => void
  onColumnClick?: (columnIndex: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void

  onSelectionChange: (cell: CellRef) => void
  selectedCell: CellRef
  scrolledToCell: CellRef
  editingCell: CellEditRef|null
}

export interface CellProps {
  rowHeight: number
  totalWidth: number
  scrollLeft: number
  overscanColumnCount: number
  columnCount: number
  getColumnWidth: (params: Index) => number
  height: number
  estimatedColumnWidth: number
  onColumnResize: (columnIndex: number, offset: number) => void
  onColumnClick: (columnIndex: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  theme: any
}

export interface GridState {
  selectedCell: CellRef
  scrolledToCell: CellRef
  editingCell: CellEditRef|null
}

export interface CellEditRef extends CellRef {
  updatedValue?: string
}

export interface CellRef {
  rowIndex: number
  columnIndex: number
}

export interface Column {
  key: string
  title: string
  icon?: React.ComponentType
  width?: number
  component?: React.ComponentType<any>
}

export interface MenuItem {
  text: React.ReactNode
  onClick: (context: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export type Ref<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null
