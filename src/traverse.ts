export const traverse = (
  target: Record<any, any>,
  path: Array<string>
): any => {
  if (path.length > 0) {
    const [key, ...remainingKeys] = path
    return traverse(target[key], remainingKeys)
  }
  return target
}
