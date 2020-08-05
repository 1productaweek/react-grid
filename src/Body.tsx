import React, { useCallback, forwardRef } from 'react'
import { css } from '@emotion/core'
import get from 'lodash/get'
import { Grid, ArrowKeyStepper, ScrollParams, GridCellProps } from 'react-virtualized'
import Cell from './Cell'
import sharedStyles from './styles'
import { Ref, CellRef, CellEditRef, Column } from './types'

export interface BodyCellRenderProps extends GridCellProps, BodyProps {}

const renderCell = ({
  rowGetter, cellGetter, getColumn, onEditDone, rowCount, showAddRow, readOnly,
  columnIndex, selectedCell, editingCell, key, rowIndex, style, selectCell, editCell,
}: BodyCellRenderProps) => {
  if (columnIndex < 1) return
  if (showAddRow && rowIndex === rowCount) return

  const isSelected = (columnIndex === selectedCell.columnIndex &&
    rowIndex === selectedCell.rowIndex) ||
    (columnIndex === selectedCell.columnIndex && selectedCell.rowIndex === null) ||
    (rowIndex === selectedCell.rowIndex && selectedCell.columnIndex === null)

  const isEditing = !!(editingCell && columnIndex === editingCell.columnIndex &&
    rowIndex === editingCell.rowIndex)

  const row = rowGetter(rowIndex)
  const column = getColumn(columnIndex)

  if (!column || !row) return null

  const value = isEditing && editingCell?.updatedValue ? editingCell.updatedValue : cellGetter(row, column?.key)

  const onSelectCell = () => {
    if (isEditing) return
    selectCell({
      columnIndex,
      rowIndex,
    })
  }

  const onEditCell = () => {
    editCell({
      columnIndex,
      rowIndex,
    })
  }

  const onChange = (updatedValue: string) => {
    editCell({
      columnIndex,
      rowIndex,
      updatedValue,
    })
  }

  return (
    <Cell
      key={key}
      value={value}
      style={style}
      isSelected={isSelected}
      isEditing={isEditing}
      onClick={onSelectCell}
      onDoubleClick={onEditCell}
      onChange={onChange}
      onEditDone={onEditDone}
      component={column.component}
      readOnly={!!readOnly}
    />
  )
}

export interface BodyProps {
  onScroll: (scroll: ScrollParams) => void
  totalHeight: number
  totalWidth: number

  selectedCell: CellRef
  scrolledToCell: CellRef
  editingCell: CellEditRef|null

  rowGetter: (rowIndex: number) => Record<string, any>
  cellGetter: (row: Record<string, any>, columnKey: string) => any
  rowCount: number
  rowHeight: number
  overscanRowCount: number
  showAddRow?: boolean

  getColumn: (columnIndex: number) => Column|null
  getColumnWidth: (columnIndex: number) => number
  columnCount: number
  estimatedColumnWidth: number
  overscanColumnCount: number

  noHeader?: boolean
  readOnly?: boolean
  editCell: (ref: CellEditRef) => void
  selectCell: (ref: CellRef) => void
  onEditDone: () => void
}

function Body (props: BodyProps, ref: Ref<Grid>) {
  const {
    onScroll,
    scrolledToCell,
    editingCell,
    overscanColumnCount,
    overscanRowCount,
    columnCount,
    rowCount,
    totalHeight,
    totalWidth,
    rowHeight,
    getColumnWidth,
    estimatedColumnWidth,
    showAddRow,
    noHeader,
    selectCell,
  } = props

  const onSelectChange = useCallback(({ scrollToRow, scrollToColumn }) => {
    selectCell({
      rowIndex: scrollToRow,
      columnIndex: scrollToColumn,
    })
  }, [selectCell])

  return (
    <ArrowKeyStepper
      isControlled
      disabled={!!editingCell}
      onScrollToChange={onSelectChange}
      scrollToColumn={scrolledToCell.columnIndex || undefined}
      scrollToRow={scrolledToCell.rowIndex || undefined}
      columnCount={columnCount}
      rowCount={showAddRow ? rowCount + 1 : rowCount}
      mode='cells'
    >
      {({ onSectionRendered, scrollToColumn, scrollToRow }) => (
        <div
          style={{
            height: totalHeight - rowHeight,
            width: totalWidth,
          }}
        >
          <Grid
            ref={ref}
            css={styles.bodyGrid}
            onSectionRendered={onSectionRendered}
            cellRenderer={renderProps => (
              renderCell({
                ...props,
                ...renderProps,
              })
            )}
            scrollToColumn={scrollToColumn}
            scrollToRow={scrollToRow}
            estimatedColumnSize={estimatedColumnWidth}
            columnWidth={({ index }) => getColumnWidth(index)}
            columnCount={columnCount}
            height={totalHeight - (noHeader ? 0 : rowHeight)}
            onScroll={onScroll}
            overscanColumnCount={overscanColumnCount}
            overscanRowCount={overscanRowCount}
            rowHeight={rowHeight}
            rowCount={showAddRow ? rowCount + 1 : rowCount}
            width={totalWidth}
          />
        </div>
      )}
    </ArrowKeyStepper>
  )
}

const styles = {
  bodyGrid: css`
    width: 100%;
    outline: none;
  `,
  addRow: (theme: any) => css`
    ${sharedStyles.cell(theme)}
    border-bottom: 0;
    background: ${theme?.colors?.base0 || '#fff'};
    color: ${theme?.colors?.base50 || '#9ba1a7'};
    font-size: 0.9em;
    font-weight: 600;
    :hover {
      background: ${theme?.colors?.base10 || '#eee'};
      cursor: pointer;
    }
  `,
}

export default forwardRef(Body)
