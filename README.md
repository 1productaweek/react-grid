# React Virtualized Grid

Virtualized grid based on [React Virtulalized](https://github.com/bvaughn/react-virtualized). Uses [@emtion](https://emotion.sh/) for styling.

### Install

```
yarn add @1productaweek/react-virtualized-grid
```


### Usage

```jsx
import React from 'react'
import Grid from '@1productaweek/react-virtualized-grid'

const columns = [
  { key: 'id', title: 'ID', editable: true, width: 40, icon: Icon },
  { key: 'title', title: 'Title', editable: true },
  { key: 'complete', title: 'Complete', editable: true, width: 300 },
  { key: 'success', title: 'Success', width: 100 },
  { key: 'started', title: 'Started At', width: 100 },
  { key: 'custom', title: 'Custom', component: () => <div>Custom!</div> },
]

const rows = [
  { id: 10, title: 'Task 1', complete: 20, success: true, started: new Date() },
  { id: 20, title: 'Task 2', complete: 40, success: true },
  { id: 30, title: 'Task 3', complete: 60, success: false },
  { id: 40, title: 'Task 4', complete: 20, success: true },
]

export default function Container () {
  return (
      <Grid
        columns={columns}
        rowCount={rows.length}
        rowGetter={i => rows[i]}
      />
  )
}
```

### Demo

https://react-virtualized-grid.netlify.app


### Made by 1PAW

https://1productaweek.com
  * |- [Ralley](https://ralley.io) - queue as a service
  * |- [Snapboard](https://snapboard.io) - hackable dashboard
