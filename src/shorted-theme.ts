import { DefaultTheme, ThemeProps } from 'styled-components'
import { functionify } from './functionify'

type FunctionalTheme<Theme, Target> = {
  [key in keyof Target]: Target[key] extends Record<string, unknown>
    ? FunctionalTheme<Theme, Target[key]>
    : (props: ThemeProps<Theme>) => Target[key]
}

export const shorted = <T = DefaultTheme>(theme: T): FunctionalTheme<T, T> => {
  return functionify(theme) as FunctionalTheme<T, T>
}
