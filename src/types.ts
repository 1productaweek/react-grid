import { MutableRefObject } from 'react'

export interface GridProps {
  isLoading?: boolean
  readOnly?: boolean
  noHeader?: boolean

  gutterWidth: number
  gutterOffset: number

  onRowsChange?: (change: {
    fromRow: number
    toRow: number
    updated: Record<string, any>
  }) => void
  rowCount: number
  rowHeight: number
  rowMenu?: MenuItem[]|((context: { rowIndex: number }) => React.ReactNode)
  overscanRowCount: number
  rowGetter: (rowIndex: number) => Record<string, any>
  onAddRow?: (count: number) => void
  onRowClick?: (columnIndex: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void

  columns: Column[]
  columnMenu?: MenuItem[]|((context: { columnIndex: number }) => React.ReactNode)
  estimatedColumnWidth: number
  overscanColumnCount: number
  onColumnResize?: (columnIndex: number, offset: number) => void
  onAddColumn?: (count: number) => void
  onColumnClick?: (columnIndex: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void

  onSelectionChange?: (cell: CellRef) => void
  selectedCell?: CellRef
  scrolledToCell?: CellRef
  editingCell?: CellEditRef|null
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
  rowIndex: number|null
  columnIndex: number|null
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
