import React from 'react'
import { css } from '@emotion/core'
import Draggable, { DraggableProps } from 'react-draggable'

export interface HeaderDragHandleProps extends Partial<DraggableProps> {
  onResize: (offset: number) => void
}

function HeaderDragHandle ({ onResize, ...props }: HeaderDragHandleProps) {
  return (
    <Draggable
      axis='x'
      defaultClassName='drag-handle'
      defaultClassNameDragging='drag-handle-active'
      onStop={(e, data) => onResize(data.x)}
      position={{
        x: 0,
        y: 0,
      }}
      {...props}
    >
      <div css={styles.dragHandle} />
    </Draggable>
  )
}

const styles = {
  dragHandle: css`
    with: 3px;
    background: #000;

  `,
}

export default HeaderDragHandle
