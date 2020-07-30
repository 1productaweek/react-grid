import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Sheet from '../Sheet'

const styles = {
  margin: 30,
  height: 300,
  width: 700,
  position: 'relative',
  border: '1px solid #eee',
}

const State = ({ children, initialState }) => {
  const [data, setData] = useState(initialState)
  return children(data, setData)
}

const Icon = () => {
  return (
    <svg width='18px' height='18px' viewBox='0 0 42 39'>
      <g id='text' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <path d='M10.1932627,9 L31.8230276,9 L32,16.1466129 L29.8873995,16.1466129 L29.7104271,14.1072097 C29.6018291,12.9465216 29.2227554,12.120739 28.5721661,11.633436 C27.9205986,11.1470907 26.8768602,10.9034509 25.4399469,10.9034509 C24.3962085,10.9034509 23.6873148,11.0704341 23.311258,11.4062179 C22.9372091,11.7411001 22.7501717,12.4400637 22.7501717,13.503109 L22.7059273,26.5489363 C22.7059273,27.5855152 22.8949674,28.2717012 23.274041,28.6074944 C23.6531353,28.9432875 24.3952097,29.1102614 25.4982564,29.1102614 L27.0347119,29.1102614 L27.0347119,31 L14.9642904,31 L14.9642904,29.1102614 L16.752111,29.1102614 C17.699319,29.1102614 18.3569358,28.9341516 18.7329925,28.580117 C19.1070415,28.2269911 19.2940788,27.5517607 19.2940788,26.5489363 L19.2930749,13.4512508 C19.2930749,12.4402273 19.1020245,11.7622404 18.7179081,11.4191591 C18.3337942,11.0751434 17.618877,10.9027034 16.5751386,10.9027034 C15.1372472,10.9027034 14.0935088,11.1463432 13.4429194,11.6326885 C12.7933598,12.1199448 12.4132616,12.9457507 12.3046584,14.1064621 L12.127686,16.1458654 L10,16.1458654 L10.1932627,9 Z' id='Fill-1' fill='#7D7D7D' />
      </g>
    </svg>
  )
}

const columns = [
  { key: 'id', name: 'ID', editable: true, width: 40, icon: Icon },
  { key: 'title', name: 'Title', editable: true },
  { key: 'complete', name: 'Complete', editable: true, width: 300 },
  { key: 'success', name: 'Success', width: 100 },
  { key: 'started', name: 'Started At', width: 100 },
  { key: 'custom', name: 'Custom', component: () => 'Custom!' },
]

const rows = [
  { id: 10, title: 'Task 1', complete: 20, success: true, started: new Date() },
  { id: 20, title: 'Task 2', complete: 40, success: true },
  { id: 30, title: 'Task 3', complete: 60, success: false },
  { id: 40, title: 'Task 4', complete: 20, success: true },
  { id: 50, title: 'Task 5', complete: 40, success: null },
  { id: 60, title: 'Task 6', complete: 20, success: false },
  { id: 70, title: 'Task 7', complete: 40 },
  { id: 80, title: 'Task 8', complete: 60 },
  { id: 90, title: 'Task 9', complete: 20 },
  { id: 100, title: 'Task 10', complete: 20 },
  { id: 110, title: 'Task 11', complete: 20 },
  { id: 120, title: 'Task 12', complete: 20 },
  { id: 130, title: { set: [{}, {}] }, complete: 20 },
]

const columnMenu = [{
  text: 'Rename',
  onClick: action('Rename'),
  popover: () => {
    return <div style={{ width: 100, height: 100, background: 'blue' }}>Hello World</div>
  },
}, {
  text: 'Insert Left',
  onClick: action('Insert Left'),
}, {
  text: 'Insert Right',
  onClick: action('Insert Right'),
}, {
  text: 'Delete',
  onClick: action('Delete'),
}]

const rowMenu = [{
  text: 'Insert Above',
  onClick: action('Insert Above'),
}, {
  text: 'Insert Below',
  onClick: action('Insert Below'),
}, {
  text: 'Delete',
  onClick: action('Delete'),
}]

storiesOf('Sheet', module)
  .add('Default', () => (
    <div style={styles}>
      <Sheet
        columns={columns}
        rowCount={rows.length}
        rowGetter={i => rows[i]}
        gutterOffset={0}
      />
    </div>
  ))
  .add('Selected Cell', () => (
    <div style={styles}>
      <Sheet
        columns={columns}
        rowCount={rows.length}
        rowGetter={i => rows[i]}
        gutterOffset={0}
        selectedCell={{ rowIndex: 0, columnIndex: 1 }}
      />
    </div>
  ))
  .add('Selected Col', () => (
    <div style={styles}>
      <Sheet
        columns={columns}
        rowCount={rows.length}
        rowGetter={i => rows[i]}
        gutterOffset={0}
        selectedCell={{ rowIndex: null, columnIndex: 1 }}
      />
    </div>
  ))
  .add('Selected Row', () => (
    <div style={styles}>
      <Sheet
        columns={columns}
        rowCount={rows.length}
        rowGetter={i => rows[i]}
        gutterOffset={0}
        selectedCell={{ rowIndex: 0, columnIndex: null }}
      />
    </div>
  ))
  .add('Add Buttons', () => (
    <div style={{ ...styles, width: 200 }}>
      <Sheet
        columns={columns}
        rowCount={rows.length}
        rowGetter={i => rows[i]}
        gutterOffset={0}
        columnMenu={columnMenu}
        rowMenu={rowMenu}
        onAddColumn={action('onAddColumn')}
        onAddRow={action('onAddRow')}
      />
    </div>
  ))
  .add('Read-only', () => (
    <div style={styles}>
      <Sheet
        columns={columns}
        rowCount={rows.length}
        rowGetter={i => rows[i]}
        gutterOffset={0}
        columnMenu={columnMenu}
        rowMenu={rowMenu}
        readOnly
      />
    </div>
  ))

  .add('Controlled Selection', () => (
    <State initialState={columns}>
      {(selection, setSelection) => (
        <div style={styles}>
          <Sheet
            columns={columns}
            rowCount={rows.length}
            rowGetter={i => rows[i]}
            gutterOffset={0}
            selectedCell={selection}
            scrolledToCell={selection}
            onColumnClick={(columnIndex) => {
              setSelection({ columnIndex, rowIndex: null })
            }}
            onRowClick={(rowIndex) => {
              setSelection({ columnIndex: null, rowIndex })
            }}
            onSelectionChange={(selection) => {
              setSelection(selection)
            }}
          />
        </div>
      )}
    </State>
  ))

  .add('Column State', () => (
    <State initialState={columns}>
      {(columns, setColumns) => (
        <div style={styles}>
          <Sheet
            columns={columns}
            rowCount={rows.length}
            rowGetter={i => rows[i]}
            gutterOffset={0}
            onColumnResize={(columnIndex, offset) => {
              const update = columns.slice(0)
              const column = columns[columnIndex]
              update[columnIndex] = { ...column, width: Math.max(30, (column.width || 75) + offset) }
              setColumns(update)
            }}
          />
          <button onClick={() => setColumns(columns.slice(1))}>Delete</button>
        </div>
      )}
    </State>
  ))

  .add('Edit', () => (
    <State initialState={rows}>
      {(rows, setRows) => (
        <div style={styles}>
          <Sheet
            columns={columns}
            rowCount={rows.length}
            rowGetter={i => rows[i]}
            gutterOffset={0}
            onRowsChange={({ fromRow, toRow, updated }) => {
              const updatedRows = []
              for (let index = 0; index < rows.length; index++) {
                const row = rows[index]
                updatedRows[index] = index >= fromRow && index <= toRow ? { ...row, ...updated } : row
              }
              setRows(updatedRows)
            }}
          />
        </div>
      )}
    </State>
  ))

  .add('No headings', () => (
    <State initialState={rows}>
      {(rows, setRows) => (
        <div style={styles}>
          <Sheet
            noHeader
            columns={columns}
            rowCount={rows.length}
            rowGetter={i => rows[i]}
            gutterOffset={0}
          />
        </div>
      )}
    </State>
  ))
