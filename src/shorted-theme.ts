import { DefaultTheme, ThemeProps } from "styled-components"
import { functionify } from "./functionify"

type FunctionalTheme<T = DefaultTheme> = {
  [key in keyof T]: T[key] extends object
      ? FunctionalTheme<T[key]>
      : (props: ThemeProps<T>) => T[key]
}

export const shorted = <T = DefaultTheme>(theme: T): FunctionalTheme<T> => {
  return functionify(theme) as FunctionalTheme<T>
}