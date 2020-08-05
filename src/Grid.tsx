import React, { memo } from 'react'
import { css } from '@emotion/core'
import isFunction from 'lodash/isFunction'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import { ScrollSync, AutoSizer, ScrollParams, Grid } from 'react-virtualized'
import 'react-virtualized/styles.css'
import OutsideClickHandler from 'react-outside-click-handler'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import Notch from './Notch'
import Gutter from './Gutter'
import Header from './Header'
import Body from './Body'
import { CellRef, CellEditRef, Column, GridProps, GridState } from './types'

const getWidths = (columns: Column[]) => columns.map(({ width }: Column) => width)

class VGrid extends React.Component<GridProps, GridState> {
  static defaultProps = {
    columns: [],

    gutterWidth: 30,
    gutterOffset: 1,

    estimatedColumnWidth: 75,
    overscanColumnCount: 0,

    rowHeight: 28,
    overscanRowCount: 5,

    cellGetter: get,
  }

  headerRef: null|Grid = null
  bodyRef: null|Grid = null
  gridRef: null|HTMLDivElement = null
  scrollPos: ScrollParams|null = null
  isUpdatingGrid = false

  state = {
    selectedCell: { rowIndex: 0, columnIndex: 0 },
    scrolledToCell: { rowIndex: 0, columnIndex: 0 },
    editingCell: null,
  } as GridState

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillUpdate (nextProps: GridProps) {
    const { columns } = this.props
    if (!isEqual(getWidths(columns), getWidths(nextProps.columns))) {
      if (this.headerRef) this.headerRef.recomputeGridSize()
      if (this.bodyRef) this.bodyRef.recomputeGridSize()
      this.isUpdatingGrid = true
    }
  }

  onScroll = (pos: ScrollParams) => {
    if (this.isUpdatingGrid) {
      if (this.bodyRef) this.bodyRef.scrollToPosition(pos)
      this.isUpdatingGrid = false
    }
    this.scrollPos = pos
  }

  getCellValue = ({ columnIndex, rowIndex }: CellRef) => {
    if (!columnIndex || !rowIndex) return
    const column = this.getColumn(columnIndex)
    const row = this.props.rowGetter(rowIndex)
    return column?.key ? this.props.cellGetter(row, column?.key) : null
  }

  getColumn = (columnIndex: number) => {
    if (columnIndex === 0) return null
    return this.props.columns[columnIndex - 1]
  }

  getColumnWidth = (columnIndex: number) => {
    const { columns, estimatedColumnWidth, gutterWidth } = this.props
    // Gutter and add column btn
    if (columnIndex === 0 || columnIndex > columns.length) return gutterWidth

    const column = this.getColumn(columnIndex)
    return column?.width || estimatedColumnWidth || 50
  }

  selectCell = (cell: CellRef|((cell: CellRef) => CellRef)) => {
    this.setState((prevState) => {
      const { columnIndex, rowIndex } = isFunction(cell) ? cell(prevState.selectedCell) : cell
      const { columns, rowCount, onSelectionChange } = this.props
      const maxRow = rowCount - 1
      const maxColumn = columns.length

      // Skip update if at the end of the range
      if (columnIndex === 0 ||
          (columnIndex && columnIndex > maxColumn) ||
          (rowIndex && rowIndex < 0) ||
          (rowIndex && rowIndex > maxRow) // Additional minus for add row btn
      ) return prevState

      const newSelection = { columnIndex, rowIndex }

      if (onSelectionChange) {
        onSelectionChange(newSelection)
      }

      return {
        selectedCell: newSelection,
        scrolledToCell: newSelection,
        editingCell: null,
      }
    })
    this.handleOnEditDone()
  }

  editCell = (cell: CellEditRef|null) => {
    // if (this.props.readOnly) return
    if (cell === null) {
      this.setState({ editingCell: null })
      return
    }
    const { columnIndex, rowIndex } = cell
    const updatedValue = cell.updatedValue || this.getCellValue(cell)
    this.setState({
      editingCell: { columnIndex, rowIndex, updatedValue },
      selectedCell: { columnIndex, rowIndex },
      scrolledToCell: { columnIndex, rowIndex },
    })
  }

  handleOnEditDone = () => {
    const { editingCell } = this.state
    const { rowGetter } = this.props

    if (editingCell === null || !editingCell.rowIndex || !editingCell.columnIndex) {
      return
    }

    const column = this.getColumn(editingCell.columnIndex)
    const row = rowGetter(editingCell.rowIndex)

    this.setState({
      editingCell: null,
    })

    if (!column?.key) return

    if (!editingCell?.updatedValue ||
      row[column?.key] === editingCell.updatedValue) return

    if (this.props.onRowsChange && editingCell) {
      this.props.onRowsChange({
        fromRow: editingCell.rowIndex,
        toRow: editingCell.rowIndex,
        updated: { [column.key]: editingCell.updatedValue },
      })
    }
  }

  scrollToCell = ({ columnIndex, rowIndex }: CellRef) => {
    this.setState({
      scrolledToCell: {
        columnIndex,
        rowIndex,
      },
    })
  }

  onOutsideClick = () => {
    this.setState({
      editingCell: null,
      selectedCell: { rowIndex: 0, columnIndex: 0 },
    })
  }

  handleOnKeyEvent = (key: string, e: React.KeyboardEvent<HTMLDivElement>) => {
    if (key === 'enter') {
      this.selectCell(({ columnIndex, rowIndex }) => ({
        columnIndex,
        rowIndex: (rowIndex || 0) + 1,
      }))
      return
    }
    if (key === 'shift+enter') {
      this.selectCell(({ columnIndex, rowIndex }) => ({
        columnIndex,
        rowIndex: (rowIndex || 0) - 1,
      }))
      return
    }
    if (key === 'tab') {
      e.preventDefault()
      this.selectCell(({ columnIndex, rowIndex }) => ({
        columnIndex: (columnIndex || 0) + 1,
        rowIndex,
      }))
      return
    }
    if (key === 'shift+tab') {
      e.preventDefault()
      this.selectCell(({ columnIndex, rowIndex }) => ({
        columnIndex: (columnIndex || 0) - 1,
        rowIndex,
      }))
      return
    }
    if (key === 'shift') {
      this.editCell({
        ...this.state.selectedCell,
      })
    }
    if (key === 'esc') {
      e.stopPropagation()
      return this.editCell(null)
    }
    if (this.state.selectedCell && !this.state.editingCell) {
      this.editCell({
        ...this.state.selectedCell,
        updatedValue: key,
      })
    }
  }

  render () {
    const {
      rowCount,
      columns,
      rowHeight,
      gutterWidth,
      gutterOffset,
      estimatedColumnWidth,
      overscanColumnCount,
      overscanRowCount,
      onColumnResize,
      rowGetter,
      cellGetter,
      columnMenu,
      rowMenu,
      onAddRow,
      onAddColumn,
      onColumnClick,
      onRowClick,
      noHeader,
      readOnly,
      isLoading = false,
    } = this.props

    const columnCount = columns.length + 1

    // Depending whether controller or uncontrolled
    const selectedCell = this.props.selectedCell || this.state.selectedCell
    const scrolledToCell = this.props.scrolledToCell || this.state.scrolledToCell
    const editingCell = this.props.editingCell || this.state.editingCell

    return (
      <KeyboardEventHandler
        handleKeys={[
          'enter', 'shift+enter', 'ctrl+enter', 'meta+enter',
          'tab', 'shift+tab', 'esc', 'alphanumeric', 'shift',
        ]}
        onKeyEvent={this.handleOnKeyEvent}
        css={styles.handlers}
      >
        <OutsideClickHandler onOutsideClick={this.onOutsideClick}>
          <AutoSizer disableWidth>
            {({ height: totalHeight }) => (
              <ScrollSync>
                {(scroll) => {
                  return (
                    <div css={styles.grid} ref={ref => { this.gridRef = ref }} tabIndex={0}>
                      {
                        isLoading && (<div css={styles.loadingPlaceholder}>Loading...</div>)
                      }
                      {!noHeader ? (
                        <Notch
                          gutterWidth={gutterWidth}
                          rowHeight={rowHeight}
                        />
                      ) : null}
                      <Gutter
                        overscanColumnCount={overscanColumnCount}
                        overscanRowCount={overscanRowCount}
                        gutterWidth={gutterWidth}
                        gutterOffset={gutterOffset}
                        rowHeight={rowHeight}
                        totalHeight={totalHeight}
                        rowCount={rowCount}
                        scrollTop={scroll.scrollTop}
                        rowMenu={rowMenu}
                        showAddRow={!!onAddRow}
                        onAddRow={onAddRow}
                        noHeader={noHeader}
                        onRowClick={onRowClick}
                      />
                      <div css={styles.gridColumn}>
                        <AutoSizer disableHeight>
                          {({ width: totalWidth }) => (
                            <div>
                              {!noHeader ? (
                                <Header
                                  ref={ref => { this.headerRef = ref }}
                                  rowHeight={rowHeight}
                                  totalWidth={totalWidth}
                                  scrollLeft={scroll.scrollLeft}
                                  overscanColumnCount={overscanColumnCount}
                                  columnCount={columnCount}
                                  getColumn={this.getColumn}
                                  getColumnWidth={this.getColumnWidth}
                                  estimatedColumnWidth={estimatedColumnWidth}
                                  columnMenu={columnMenu}
                                  onColumnResize={onColumnResize}
                                  onColumnClick={onColumnClick}
                                  onAddColumn={onAddColumn}
                                  showAddColumn={!!onAddColumn}
                                />
                              ) : null}
                              <Body
                                ref={ref => { this.bodyRef = ref }}
                                rowGetter={rowGetter}
                                cellGetter={cellGetter}
                                overscanColumnCount={overscanColumnCount}
                                overscanRowCount={overscanRowCount}
                                onScroll={(pos) => {
                                  scroll.onScroll(pos)
                                  this.onScroll(pos)
                                }}
                                columnCount={onAddColumn ? columnCount + 1 : columnCount}
                                rowCount={rowCount}
                                totalHeight={totalHeight}
                                totalWidth={totalWidth}
                                rowHeight={rowHeight}
                                editingCell={editingCell}
                                selectedCell={selectedCell}
                                scrolledToCell={scrolledToCell}
                                onEditDone={this.handleOnEditDone}
                                readOnly={readOnly}
                                editCell={this.editCell}
                                selectCell={this.selectCell}
                                getColumn={this.getColumn}
                                getColumnWidth={this.getColumnWidth}
                                estimatedColumnWidth={estimatedColumnWidth}
                                showAddRow={!!onAddRow}
                                noHeader={noHeader}
                              />
                            </div>
                          )}
                        </AutoSizer>
                      </div>
                    </div>
                  )
                }}
              </ScrollSync>
            )}
          </AutoSizer>
        </OutsideClickHandler>
      </KeyboardEventHandler>
    )
  }
}

const styles = {
  handlers: css`
    height: 100%;
    display: block;
    > div {
      height: 100%;
      display: block;
    }
  `,
  grid: css`
    position: relative;
    display: flex;
    flex-direction: row;
    font-size: 0.9em;
    * {
      box-sizing: border-box;
    }
`,
  loadingPlaceholder: css`
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
`,
  gridColumn: css`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
`,
  notchGrid: css`
    width: 100%;
    overflow: hidden !important;
    outline: none;
  `,
  notch: css`
    flex: 0 0 75px;
    z-index: 3;
    outline: none;
  `,
}

export default memo(VGrid)
