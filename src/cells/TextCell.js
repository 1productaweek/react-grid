import React from 'react'
import { css } from '@emotion/core'
import isObject from 'lodash/isObject'
import { withTheme, useTheme } from 'emotion-theming'

function TextCell ({ innerRef, isEditing, onChange, value }) {
  const theme = useTheme()
  const cellInnerEl = isEditing ? (
    <input
      value={getValue(value)}
      onChange={(newVal) => {
        if (isObject(value)) onChange(JSON.parse(newVal))
        else onChange(newVal)
      }}
      ref={innerRef}
      css={styles.input(theme)}
    />
  ) : getValue(value)
  return cellInnerEl
}

function getValue (value) {
  if (isObject(value)) return JSON.stringify(value)
  if (value && value.toString) return value.toString()
  if (value === null) return ''
  if (value === undefined) return ''
  return value
}

const styles = {
  input: theme => css`
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

export default withTheme(TextCell)
