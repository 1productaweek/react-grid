import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import light from './light'
import dark from './dark'

interface ContainerProps {
  children?: React.ReactNode
  theme?: string
}

const themes = {
  light,
  dark,
}

export default function Container ({ children, theme = 'light' }: ContainerProps) {
  const themeObj = (themes as any)[theme]
  return (
    <ThemeProvider theme={themeObj}>
      {children}
    </ThemeProvider>
  )
}
