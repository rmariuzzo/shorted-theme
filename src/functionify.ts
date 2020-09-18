import { ThemeProps, DefaultTheme } from 'styled-components'
import { traverse } from './traverse'

type Functionified<T> = {
  [key in keyof T]: T[key] extends Record<string, unknown>
    ? Functionified<T[key]>
    : (props: ThemeProps<T>) => T[key]
}

/**
 * Convert all properties in a object to interpolated theme functions that return their values.
 * @param target The target object.
 * @param path The path to the property to convert into a function.
 */
export const functionify = <T = DefaultTheme>(
  target: T,
  path: Array<string> = []
): Functionified<T> => {
  return Object.keys(target).reduce<Record<any, any>>((p, key) => {
    const fullPath = [...path, key]
    if (typeof target[key as keyof T] === 'function') {
      p[key] = target[key as keyof T]
    } else if (
      ['string', 'number', 'boolean'].includes(typeof target[key as keyof T])
    ) {
      p[key] = (props: ThemeProps<DefaultTheme>) =>
        traverse(props.theme, fullPath)
    } else {
      p[key] = functionify(target[key as keyof T], fullPath)
    }
    return p
  }, {}) as Functionified<T>
}
