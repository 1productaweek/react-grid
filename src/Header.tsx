import React, { forwardRef } from 'react'
import { css } from '@emotion/core'
import { Grid, Index, GridCellProps } from 'react-virtualized'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import HeaderCell from './HeaderCell'
import sharedStyles from './styles'
import { withTheme } from 'emotion-theming'
import { Ref, MenuItem, Column } from './types'

export interface HeaderCellRendererProps extends GridCellProps, HeaderProps {
  theme: any
}

export const renderHeaderCell = withTheme(({
  getColumn, columnCount, showAddColumn, onAddColumn, columnMenu, columnIndex,
  key, style, onColumnResize, onColumnClick, theme,
}: HeaderCellRendererProps) => {
  if (columnIndex < 1) return null

  // Render add column
  if (showAddColumn && columnIndex === columnCount) {
    return (
      <div
        key={key}
        css={styles.addColumn(theme)}
        style={style}
        onClick={() => onAddColumn && onAddColumn(columnCount - 1)}
      >+
      </div>
    )
  }

  const column = getColumn(columnIndex)

  return (
    <HeaderCell
      key={key}
      style={style}
      column={column}
      columnIndex={columnIndex}
      menuData={columnMenu}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onColumnClick && onColumnClick(columnIndex, e)}
      onResize={(offset: number) => onColumnResize(columnIndex - 1, offset)}
    />
  )
})

export interface HeaderProps {
  // TODO: what is the difference between these?!
  rowHeight: number
  height: number
  totalWidth: number
  scrollLeft: number

  getColumn: (columnIndex: number) => Column
  columnMenu: MenuItem[]
  columnCount: number
  overscanColumnCount: number
  getColumnWidth: (params: Index) => number
  estimatedColumnWidth: number
  onColumnResize: (columnIndex: number, offset: number) => void
  onColumnClick: (columnIndex: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onAddColumn: (count: number) => void
  showAddColumn: boolean

  theme: any
}

function Header (props: HeaderProps, ref: Ref<Grid>) {
  const {
    rowHeight,
    totalWidth,
    scrollLeft,
    overscanColumnCount,
    columnCount,
    getColumnWidth,
    estimatedColumnWidth,
    showAddColumn,
    theme,
  } = props
  return (
    <div
      style={{
        height: rowHeight,
        width: totalWidth - scrollbarSize(),
        background: theme?.colors?.base0 || '#fff',
      }}
    >
      <Grid
        ref={ref}
        css={styles.headerGrid}
        columnWidth={getColumnWidth}
        estimatedColumnSize={estimatedColumnWidth}
        columnCount={showAddColumn ? columnCount + 1 : columnCount}
        height={rowHeight}
        overscanColumnCount={overscanColumnCount}
        cellRenderer={(renderProps) => renderHeaderCell({
          ...props,
          ...renderProps,
        })}
        rowHeight={rowHeight}
        rowCount={1}
        scrollLeft={scrollLeft}
        width={totalWidth - scrollbarSize()}
      />
    </div>
  )
}

const styles = {
  headerGrid: css`
    width: 100%;
    overflow: hidden !important;
    outline: none;
`,
  addColumn: (theme: any) => css`
    ${sharedStyles.cell(theme)}
    border: 0;
    color: ${theme?.colors?.base50 || '#9ba1a7'};
    font-weight: 600;
    text-align: center;
    :hover {
      background: ${theme?.colors?.base10 || '#eee'};
      cursor: pointer;
    }
  `,
}

export default withTheme(forwardRef(Header))
