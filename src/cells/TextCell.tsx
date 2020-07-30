import React, { forwardRef } from 'react'
import { css } from '@emotion/core'
import isObject from 'lodash/isObject'
import { withTheme, useTheme } from 'emotion-theming'

export interface TextCellProps {
  isEditing: boolean
  onChange: (val: any) => void
  value: any
  readOnly?: boolean
}

function TextCell ({ isEditing, onChange, value }: TextCellProps, ref: any) {
  const theme = useTheme()
  const cellInnerEl = isEditing ? (
    <input
      value={getValue(value)}
      onChange={(newVal: any) => {
        if (isObject(value)) onChange(JSON.parse(newVal))
        else onChange(newVal)
      }}
      ref={ref}
      css={styles.input(theme)}
    />
  ) : getValue(value)
  return cellInnerEl
}

function getValue (value: any) {
  if (isObject(value)) return JSON.stringify(value)
  if (value && value.toString) return value.toString()
  if (value === null) return ''
  if (value === undefined) return ''
  return value
}

const styles = {
  input: (theme: any) => css`
    font-size: 100%;
    outline: none;
    width: 100%;
    height: 100%;
    border: 0;
    box-shadow: none;
    background: ${theme?.colors?.base0 || '#fff'};
    border-radius: 0;
  `,
}

export default withTheme(forwardRef(TextCell))
