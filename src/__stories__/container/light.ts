// import { TTheme } from './types'

/* eslint-disable @typescript-eslint/camelcase */

const colors = {
  primary0: '#E7F3FF',
  primary10: '#e9f0ff',
  primary20: '#d7e3ff',
  primary30: '#82b8ff',
  primary40: '#479dff',
  primary50: '#007BFF',
  primary60: '#006ad1',
  primary70: '#005695',
  primary80: '#003b5a',
  primary90: '#002533',
  primary100: '#000a20',
  secondary5: '#cceef0',
  secondary10: '#b3e5e9',
  secondary20: '#b3e5e9',
  secondary30: '#99dce1',
  secondary40: '#66cbd3',
  secondary50: '#33b9c4',
  secondary60: '#00a8b5',
  secondary70: '#008691',
  secondary80: '#00656d',
  secondary90: '#004348',
  secondary100: '#002224',
  secondary: '#fff',
  base0: '#fff',
  // Accent for background (against white)
  base01: '#fafafa',
  // Hover
  base05: '#f4f4f4',
  // Border
  base10: '#eee',
  base20: '#dcdde1',
  base30: '#c9cacf',
  base40: '#b2b6bb',
  // Light text - Don't go lighter than this
  // for text
  base50: '#9ba1a7',
  base60: '#858D94',
  base70: '#6d7379',
  // Default text
  base80: '#4a4f52',
  base90: '#2b2e30',
  base100: '#1a1c1d',
  success: '#28a745',
  info: '#17a2b8',
  warning: '#ffc107',
  danger: '#dc3545',
  dangerFocus: '#faf0f0',
  dangerActive: '#fad4d4',
  dangerHover: '#faf0f0',
}

const baseFont = {
  lineHeight: 1.5,
  color: colors.base80,
}

export default {
  colors,
  baseFont,
  boxShadow: 'rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px',
} as any
