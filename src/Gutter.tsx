import React from 'react'
import { css } from '@emotion/core'
import { Grid, GridCellProps } from 'react-virtualized'
import GutterCell from './GutterCell'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import sharedStyles from './styles'
import { useTheme } from 'emotion-theming'
import { RowMenu } from './types'

export interface GutterCellRenderer extends GridCellProps, GutterProps {
  onRowClick?: (rowIndex: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  theme?: any
}

const renderGutterCell = ({
  // GutterProps
  rowCount, showAddRow, gutterOffset, rowMenu, onAddRow, theme,

  // GridCellProps
  key, rowIndex, style, onRowClick,
}: GutterCellRenderer) => {
  if (showAddRow && rowIndex === rowCount) {
    return (
      <div
        key={key}
        onClick={() => onAddRow && onAddRow(rowCount)}
        css={styles.addRow(theme)}
        style={style}
      >
        +
      </div>
    )
  }

  return (
    <GutterCell
      key={key}
      rowIndex={rowIndex}
      menu={rowMenu}
      style={style}
      offset={gutterOffset}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onRowClick && onRowClick(rowIndex, e)}
    />
  )
}

export interface GutterProps {
  gutterOffset: number
  gutterWidth: number
  overscanColumnCount: number
  overscanRowCount: number
  rowHeight: number
  rowCount: number
  rowMenu?: RowMenu
  showAddRow?: boolean
  onAddRow?: (count: number) => void
  noHeader?: boolean
  totalHeight: number
  scrollTop: number
  onRowClick?: (rowIndex: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

function Gutter (props: GutterProps) {
  const {
    gutterWidth,
    overscanColumnCount,
    overscanRowCount,
    rowHeight,
    totalHeight,
    rowCount,
    scrollTop,
    showAddRow,
    noHeader,
    onRowClick,
  } = props

  const theme: any = useTheme()

  return (
    <div
      css={styles.gutterGridContainer}
      style={{
        position: 'absolute',
        top: noHeader ? 0 : rowHeight,
        backgroundColor: theme?.colors?.base0 || '#fff',
      }}
    >
      <Grid
        css={styles.gutterGrid}
        overscanColumnCount={overscanColumnCount}
        overscanRowCount={overscanRowCount}
        cellRenderer={(renderProps) => renderGutterCell({
          ...props,
          ...renderProps,
          onRowClick,
          theme,
        })}
        columnWidth={gutterWidth}
        columnCount={1}
        height={totalHeight - (noHeader ? 0 : rowHeight) - scrollbarSize()}
        rowHeight={rowHeight}
        rowCount={showAddRow ? rowCount + 1 : rowCount}
        scrollTop={scrollTop}
        width={gutterWidth}
      />
    </div>
  )
}

const styles = {
  gutterGridContainer: css`
    flex: 0 0 75px;
    z-index: 1;
    outline: none;
  `,
  gutterGrid: css`
    overflow: hidden !important;
    outline: none;
  `,
  addRow: (theme: any) => css`
    ${sharedStyles.cell(theme)}
    border: 0;
    color: ${theme?.colors?.theme50 || '#9ba1a7'};
    font-weight: 600;
    text-align: center;
    :hover {
      background: ${theme?.colors?.base10 || '#eee'};
      cursor: pointer;
    }
  `,
}

export default Gutter
