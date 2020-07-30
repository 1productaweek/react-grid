// import { TTheme } from './types'

/* eslint-disable @typescript-eslint/camelcase */
const colors = {
  primary0: '#002533',
  primary10: '#002533',
  primary20: '#003b5a',
  primary30: '#005695',
  primary40: '#006ad1',
  primary50: '#007BFF',
  primary60: '#3591ff',
  primary70: '#70a7ff',
  primary80: '#a0bdff',
  primary90: '#cfdaff',
  primary100: '#E7F3FF',
  secondary: '#fff',
  success: '#28a745',
  info: '#17a2b8',
  warning: '#ffc107',
  danger: '#dc3545',
  dangerFocus: '#AC3B2F',
  dangerActive: '#402522',
  dangerHover: '#2F2120',
  base0: '#1e1e1e',
  base01: '#1f1f1f',
  base05: '#222',
  base10: '#333',
  base20: '#343a40',
  base30: '#495057',
  base40: '#6c757d',
  base50: '#adb5bd',
  base60: '#ced4da',
  base70: '#dee2e6',
  base80: '#e9ecef',
  base90: '#f8f9fa',
  base100: '#fff',
  base100A80: '#FFFFFFCC',
}

const baseFont = {
  lineHeight: 1.5,
  color: colors.base80,
}

export default {
  colors,
  baseFont,
  boxShadow: 'rgba(255, 255, 255, 0.04) 0px 0px 0px 1px, rgba(15, 15, 15, 0.39) 0px 3px 6px, rgba(15, 15, 15, 0.6) 0px 9px 10px',
} as any
