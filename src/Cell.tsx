import React, { useRef, useState, useEffect, useCallback } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { withTheme } from 'emotion-theming'
import { css } from '@emotion/core'
import TextCell from './cells/TextCell'
import sharedStyles from './styles'

export interface CellProps {
  value: any
  onChange: (value: any, e?: any) => void
  component?: React.ComponentType<any>

  isSelected: boolean
  isEditing: boolean
  readOnly: boolean

  onEditDone: () => void
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onDoubleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void

  style?: React.CSSProperties
  theme: any
}

function Cell (props: CellProps) {
  const {
    value,
    isSelected,
    isEditing,
    onEditDone,
    onClick,
    onChange,
    component,
    readOnly,
    theme,
    ...rest
  } = props

  const [updatedValue, setUpdatedValue] = useState(props.value)
  const cellRef = useRef<any>()
  const inputRef = useRef<any>()

  useEffect(() => {

  }, [isEditing])

  const onLocalChange = useCallback((e) => {
    if (readOnly) return
    const value = e.target.value
    if (onChange) onChange(value, e)
    setUpdatedValue(value)
  }, [onChange, readOnly])

  const cellStyles = [sharedStyles.cell(theme), styles.cell(theme)]

  if (!isEditing) {
    cellStyles.push(styles.display)
  }

  if (isSelected && !isEditing) {
    cellStyles.push(css`background: ${theme?.colors?.primary0 || '#E7F3FF'};`)
  }

  const CellComponent = component || TextCell

  return (
    <OutsideClickHandler disabled={!isEditing} onOutsideClick={onEditDone}>
      <div
        tabIndex={0}
        ref={cellRef}
        css={cellStyles}
        onClick={onClick}
        {...rest}
      >
        <CellComponent
          readOnly={readOnly}
          ref={inputRef}
          isEditing={isEditing}
          onChange={onLocalChange}
          value={updatedValue}
        />
      </div>
    </OutsideClickHandler>
  )
}

const styles = {
  cell: (theme: any) => css`
    outline: none;
    background: ${theme?.colors?.base0 || '#fff'};
  `,
  display: css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
}

export default withTheme(Cell)
