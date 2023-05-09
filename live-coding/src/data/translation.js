import { LanguageContext } from "../AccessibilityContext";
import { useContext } from 'react';

export function useTranslate() {
  const language = useContext(LanguageContext);

  const translate = (phrase) => {
    if(translation[language.value] === undefined) {
      return phrase;
    }
  
    return translation[language.value][phrase];
  }

  return { translate }
}

const translation = {
  se: {
    'Height': 'Längd',
    'Weight': 'Vikt'
  },
  es: {
    'Height': 'La talla',
    'Weight': 'Peso'
  }
}

export const languages = ["en", ...Object.keys(translation)]; // translated languages
