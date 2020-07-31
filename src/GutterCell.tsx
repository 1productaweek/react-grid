import React, { useState, useRef } from 'react'
import { css } from '@emotion/core'
import isFunction from 'lodash/isFunction'
import { useTheme } from 'emotion-theming'
import Popover, { PopoverInfo } from 'react-tiny-popover'
import Menu from './Menu'
import sharedStyles from './styles'
import { RowMenu } from './types'

export interface GutterCellProps {
  rowIndex: number
  menu?: RowMenu
  offset?: number
  style?: React.CSSProperties
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

function GutterCell ({ rowIndex, menu, offset = 1, style, onClick }: GutterCellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useTheme()
  const ref = useRef<any>()

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    if (!menu) return
    setIsOpen(true)
  }

  const cellStyles = [sharedStyles.cell(theme), styles.gutterCell(theme, isOpen)]

  const el = (
    <div
      ref={ref}
      onContextMenu={onContextMenu}
      css={cellStyles}
      style={style}
      onClick={onClick}
    >
      {rowIndex + offset}
    </div>
  )

  if (!menu) {
    return el
  }

  return (
    <Popover
      position='right'
      containerStyle={{ zIndex: '10' }}
      content={isFunction(menu) ? (info: PopoverInfo) => menu({ rowIndex }, info) : () => (
        <Menu
          data={menu}
          onRequestClose={() => setIsOpen(false)}
          context={{ rowIndex, ref: ref.current }}
        />
      )}
      isOpen={isOpen}
      onClickOutside={() => setIsOpen(false)}
    >
      {el}
    </Popover>
  )
}

const styles = {
  gutterCell: (theme: any, isOpen: boolean) => css`
    text-align: center;
    color: ${theme?.colors?.base60 || '#858D94'};
    font-size: 0.95em;
    background-color: ${isOpen ? theme?.colors?.base10 || '#eee' : theme?.colors?.base0 || '#fff'};
  `,
}
export default GutterCell
