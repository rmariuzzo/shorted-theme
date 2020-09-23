import { ThemeProps, DefaultTheme } from 'styled-components'
import { traverse } from './traverse'

type Functionified<Theme, Target> = {
  [key in keyof Target]: Target[key] extends Record<string, unknown>
    ? Functionified<Theme, Target[key]>
    : (props: ThemeProps<Theme>) => Target[key]
}

/**
 * Convert all properties in a object to interpolated theme functions that return their values.
 * @param target The target object.
 * @param path The path to the property to convert into a function.
 */
export const functionify = <Theme = DefaultTheme, Target = any>(
  target: Target,
  path: Array<string> = []
): Functionified<Theme, Target> => {
  return Object.keys(target).reduce<Record<any, any>>((p, key) => {
    const fullPath = [...path, key]
    if (typeof target[key as keyof Target] === 'function') {
      p[key] = target[key as keyof Target]
    } else if (
      ['string', 'number', 'boolean'].includes(
        typeof target[key as keyof Target]
      )
    ) {
      p[key] = (props: ThemeProps<Target>) => traverse(props.theme, fullPath)
    } else {
      p[key] = functionify(target[key as keyof Target], fullPath)
    }
    return p
  }, {}) as Functionified<Theme, Target>
}
