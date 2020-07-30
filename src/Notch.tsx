import React from 'react'
import { css } from '@emotion/core'
import { Grid, GridCellProps } from 'react-virtualized'
import sharedStyles from './styles'
import { withTheme } from 'emotion-theming'

export interface NotchCellRendererProps extends GridCellProps, NotchProps {
  theme: any
}

const notchCellRenderer = ({
  // GridCellProps
  key, style, theme,
}: NotchCellRendererProps) => {
  return (
    <div key={key} style={style} css={sharedStyles.cell(theme)} />
  )
}

export interface NotchProps {
  gutterWidth: number
  rowHeight: number
  theme: any
}

function Notch (props: NotchProps) {
  const { gutterWidth, rowHeight, theme } = props
  return (
    <div
      css={styles.notch}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        background: theme?.colors?.base10 || '#eee',
      }}
    >
      <Grid
        css={styles.notchGrid}
        cellRenderer={(renderProps) => notchCellRenderer({
          ...props,
          ...renderProps,
          theme,
        })}
        width={gutterWidth}
        height={rowHeight}
        rowHeight={rowHeight}
        columnWidth={gutterWidth}
        rowCount={1}
        columnCount={1}
      />
    </div>
  )
}

const styles = {
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

export default withTheme(Notch)
