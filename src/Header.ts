import React from 'react'
import { css } from '@emotion/core'
import { Grid } from 'react-virtualized'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import HeaderCell from './HeaderCell'
import sharedStyles from './styles'
import { withTheme } from 'emotion-theming'

class Header extends React.Component {
  renderAddColumn = ({ key, style }) => {
    const { onAddColumn, columnCount, theme } = this.props
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

  renderHeaderCell = ({ columnIndex, key, style, onResize, onColumnClick }) => {
    const {
      getColumn, columnCount, showAddColumn, columnMenu,
    } = this.props
    if (columnIndex < 1) return null
    if (showAddColumn && columnIndex === columnCount) return this.renderAddColumn({ key, style })

    const column = getColumn(columnIndex)

    return (
      <HeaderCell
        key={key}
        style={style}
        column={column}
        columnIndex={columnIndex}
        menuData={columnMenu}
        onClick={(e) => onColumnClick && onColumnClick(columnIndex, e)}
        onResize={offset => onResize(columnIndex - 1, offset)}
      />
    )
  }

  render () {
    const {
      rowHeight,
      totalWidth,
      scrollLeft,
      overscanColumnCount,
      columnCount,
      getColumnWidth,
      estimatedColumnWidth,
      onColumnResize,
      onColumnClick,
      innerRef,
      showAddColumn,
      theme,
    } = this.props

    return (
      <div
        style={{
          height: rowHeight,
          width: totalWidth - scrollbarSize(),
          background: theme?.colors?.base0 || '#fff',
        }}
      >
        <Grid
          ref={innerRef}
          css={styles.headerGrid}
          columnWidth={getColumnWidth}
          estimatedColumnSize={estimatedColumnWidth}
          columnCount={showAddColumn ? columnCount + 1 : columnCount}
          height={rowHeight}
          overscanColumnCount={overscanColumnCount}
          cellRenderer={(props) => this.renderHeaderCell({
            ...props,
            onColumnClick,
            onResize: onColumnResize,
          })}
          rowHeight={rowHeight}
          rowCount={1}
          scrollLeft={scrollLeft}
          width={totalWidth - scrollbarSize()}
        />
      </div>
    )
  }
}

const styles = {
  headerGrid: css`
    width: 100%;
    overflow: hidden !important;
    outline: none;
`,
  addColumn: theme => css`
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

export default withTheme(Header)
