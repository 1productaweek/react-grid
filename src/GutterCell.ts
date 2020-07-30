import React, { useState, useRef } from 'react'
import { css } from '@emotion/core'
import Popover from 'react-tiny-popover'
import Menu from './Menu'
import sharedStyles from './styles'
import { useTheme } from 'emotion-theming'

function GutterCell ({ rowIndex, style, menuData, offset = 1, onClick }) {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useTheme(styles)
  const ref = useRef()

  const onContextMenu = (e) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const cellStyles = [sharedStyles.cell(theme), styles.gutterCell(theme, isOpen)]

  return (
    <Popover
      position='right'
      containerStyle={{ zIndex: '10' }}
      content={() => (
        <Menu
          data={menuData}
          onRequestClose={() => setIsOpen(false)}
          context={{ rowIndex, ref: ref.current }}
        />
      )}
      isOpen={isOpen}
      onClickOutside={() => setIsOpen(false)}
    >
      <div
        ref={ref}
        onClick={onClick}
        onContextMenu={onContextMenu}
        style={style}
        css={cellStyles}
      >
        {rowIndex + offset}
      </div>
    </Popover>
  )
}

const styles = {
  gutterCell: (theme, isOpen) => css`
    text-align: center;
    color: ${theme?.colors?.base60 || '#858D94'};
    font-size: 0.95em;
    background-color: ${isOpen ? theme?.colors?.base10 || '#eee' : theme?.colors?.base0 || '#fff'};
  `,
}

export default GutterCell
