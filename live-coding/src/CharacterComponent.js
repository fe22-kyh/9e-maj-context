import { useContext } from 'react';
import { ThemeContext } from './AccessibilityContext';
import { useTranslate } from './data/translation';
import CharacterStyle from './Character.module.css';

export default function CharacterComponent({data}) {
  const theme = useContext(ThemeContext);
  const { translate } = useTranslate();

  return (
    <article className={CharacterStyle[theme.value]}>
      <h3>{data.name}</h3>
      <p>{translate("Height")}: {data.height}cm</p>    
      <p>{translate("Weight")}: {data.mass}kg</p>     
    </article>
  )
}