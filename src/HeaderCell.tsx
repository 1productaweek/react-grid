import React, { useState, useRef } from 'react'
import { css } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import Popover from 'react-tiny-popover'
import Menu from './Menu'
import sharedStyles from './styles'
import HeaderDragHandle from './HeaderDragHandle'
import { Column, MenuItem } from './types'

export interface HeaderCellProps {
  column: Column
  columnIndex: number
  menuData: MenuItem[]
  onResize: (offset: number) => void
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  style?: React.CSSProperties
}

function HeaderCell ({
  column, style, menuData, onResize, columnIndex, onClick,
}: HeaderCellProps) {
  const theme: any = useTheme()
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const ref = useRef<any>()

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setMenuIsOpen(true)
  }

  const cellStyles = [sharedStyles.cell(theme), styles.headerCell(theme)]
  if (menuIsOpen) {
    cellStyles.push(
      css`background: ${theme?.colors?.base20 || '#dcdde1'};`,
    )
  }

  return (
    <Popover
      position='bottom'
      containerStyle={{ zIndex: '10' }}
      content={() => (
        <Menu
          data={menuData}
          onRequestClose={() => setMenuIsOpen(false)}
          context={{ columnIndex: columnIndex - 1, ref: ref.current }}
        />
      )}
      isOpen={menuIsOpen}
      onClickOutside={() => setMenuIsOpen(false)}
    >
      <div
        ref={ref}
        onClick={onClick}
        onContextMenu={onContextMenu}
        style={style}
        css={cellStyles}
      >
        {column.icon && (
          <div css={styles.icon}>
            {column.icon}
          </div>
        )}
        <div css={styles.title}>
          {column.title}
        </div>
        <HeaderDragHandle onResize={onResize} />
      </div>
    </Popover>
  )
}

const styles = {
  headerCell: (theme: any) => css`
    display: flex;
    flex-direction: row;
    font-weight: 600;
    border-right: 1px solid ${theme?.colors?.base10 || '#eee'};
    border-bottom: 1px solid ${theme?.colors?.base10 || '#eee'};
    position: relative;
    padding: 0 .2em;
    .drag-handle {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 3px;
      z-index: 2;
      cursor: col-resize;
      color: rgba(0, 0, 0, 0.2);
      :hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    .drag-handle-active {
      color: rgba(0, 0, 0, 0.6);
      z-index: 3;
    }
  `,
  icon: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  title: css`
    padding: 0 .2em;
    flex: 1 1 auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
  `,
}

export default HeaderCell
