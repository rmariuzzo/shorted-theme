# ![shorted-theme - Shorted theme references for Styled Components.](.github/assets/banner.svg)

**Instead of writing a function to reference a theme prop:**
```ts
styled.button`
  color: ${props => props.theme.colors.primary};
`
```
**... use a _shorted theme_ reference:**
```ts
styled.button`
  color: ${t.colors.primary};
`
```

## Installation
```bash
npm i shorted-theme
```

## Usage
```ts
import styled from 'styled-components'
import shorted from 'shorted-theme'

const theme = {
  colors: {
    primary: 'red',
    secondary: 'blue',
  },
  fontFamily: '"Roboto", sans-serif',
  fontSizes: {
    small: 12,
    regular: 14,
    large: 18,
  }
}

const t = shorted(theme)

const Button = styled.button`
  color: ${t.colors.primary};
  color: ${t.colors.primary};
  font-family: ${t.fontFamily};
  font-size: ${t.fontSizes.regular};
`
```
