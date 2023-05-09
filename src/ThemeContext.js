import {createContext} from 'react';

export const THEME_DARK = 'theme-dark';
export const THEME_LIGHT = 'theme-light';

export const ThemeContext = createContext({value: THEME_DARK, toggle: () => {}});