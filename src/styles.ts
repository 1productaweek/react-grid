import { css } from '@emotion/core'

export default {
  cell: (theme: any) => css`
    background: ${theme?.colors?.base0 || '#fff'};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    padding: 0 .5em;
    border-right: 1px solid ${theme?.colors?.base10 || '#eee'};
    border-bottom: 1px solid ${theme?.colors?.base10 || '#eee'};
    cursor: default;
    user-select: none;
  `,
}
