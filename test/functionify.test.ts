import { functionify } from '../src/functionify'

describe('functionify', () => {
  it('should convert object props with primitive values to functions', () => {
    const object = {
      number: 123,
      string: 'test',
      boolean: true,
      nested: {
        number: 456
      }
    }
    const fnObject = functionify(object)
    expect(fnObject).toEqual(
      expect.objectContaining<typeof object>({
        number: expect.any(Function),
        string: expect.any(Function),
        boolean: expect.any(Function),
        nested: {
          number: expect.any(Function)
        }
      })
    )
    expect(fnObject.number({ theme: object })).toBe(object.number)
    expect(fnObject.string({ theme: object })).toBe(object.string)
    expect(fnObject.boolean({ theme: object })).toBe(object.boolean)
    expect(fnObject.nested.number({ theme: object })).toBe(object.nested.number)
  })

  it('should not convert object props with functions to functions', () => {
    const object = {
      fn: () => 'test'
    }
    const fnObject = functionify(object)
    expect(fnObject).toEqual(object)
  })
})
