import { DefaultTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#74AF6F',
    secondary: '#414757',
    error: '#f13a59',
  },
  buttonPrimary: {
    ...DefaultTheme.buttonPrimary,
    text: '#000A00',
  },
}
