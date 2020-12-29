import {createContext} from 'react';

export const ThemeContext = createContext<{
  theme: string,
  setTheme?: (theme: string) => void
}>({theme: "Dark"});