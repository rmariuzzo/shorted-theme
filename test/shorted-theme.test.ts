import { shorted } from '../src/shorted-theme'

describe('shorted', () => {
  it('should convert a theme object preserving all props', () => {
    const theme = {
      a: {
        b: {
          c: 'test value',
        },
      },
    }
    expect(shorted(theme)).toEqual(expect.objectContaining({
      a: {
        b: {
          c: expect.any(Function)
        }
      }
    }))
  })
})