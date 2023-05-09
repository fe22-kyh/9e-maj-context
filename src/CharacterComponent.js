import { useContext } from 'react';
import { THEME_DARK, ThemeContext } from './ThemeContext';
import { language } from './data/translation';
import CharacterStyle from './Character.module.css';

export default function CharacterComponent({data}) {
  const theme = useContext(ThemeContext);

  return (
    <article className={CharacterStyle[theme.value]}>
      <h3>{data.name}</h3>
      <p>{language['en']?.Height || 'Height'}: {data.height}cm</p>
      <p>Weight: {data.mass}kg</p>
    </article>
  )
}