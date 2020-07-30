import React from 'react'
import { css } from '@emotion/core'
import { Grid } from 'react-virtualized'
import GutterCell from './GutterCell'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import sharedStyles from './styles'
import { withTheme } from 'emotion-theming'

class Gutter extends React.Component {
  renderGutterCell = ({ key, rowIndex, style, onRowClick }) => {
    const { rowCount, showAddRow, gutterOffset, rowMenu, onAddRow, theme } = this.props
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
        menuData={rowMenu}
        style={style}
        offset={gutterOffset}
        onClick={(e) => onRowClick && onRowClick(rowIndex, e)}
      />
    )
  }

  render () {
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
      theme,
    } = this.props
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
          cellRenderer={(props) => this.renderGutterCell({
            ...props,
            onRowClick,
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
  addRow: theme => css`
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

export default withTheme(Gutter)
