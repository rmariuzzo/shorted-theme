import { traverse } from '../src/traverse'

describe('traverse', () => {
  it('should return expected value when traversing an object using a real path', () => {
    const object = {
      number: 123,
      nested: {
        number: 456
      }
    }
    expect(traverse(object, ['number'])).toBe(object.number)
    expect(traverse(object, ['nested', 'number'])).toBe(object.nested.number)
  })

  it('should return undefined when traversing an object using a bad path', () => {
    const object = {
      number: 123,
      nested: {
        number: 456
      }
    }
    expect(traverse(object, ['bad path'])).toBeUndefined()
    expect(traverse(object, ['nested', 'bad path'])).toBeUndefined()
    expect(traverse(object, ['nested', 'number', 'bad path'])).toBeUndefined()
  })
})
