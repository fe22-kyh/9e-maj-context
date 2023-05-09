import { createContext } from 'react';
import { language, languages } from './data/translation';

export const THEME_DARK = 'theme-dark'; // referred to in style.css as dark themed partials
export const THEME_LIGHT = 'theme-light'; // referred to in style.css as light themed partials

export const ThemeContext = createContext({value: THEME_DARK, toggle: () => {}});

export const LanguageContext = createContext({value: languages[0], update: (name) => {}});