import { useState, useContext } from "react";
import SearchPage from "./SearchPage";
import { LanguageContext, THEME_DARK, THEME_LIGHT, ThemeContext } from "./AccessibilityContext";


function App() {
  const themeCtx = useContext(ThemeContext);
  const languageCtx = useContext(LanguageContext);

  const [, setRefresh] = useState(); // dummy state, used to force a re-render

  themeCtx.toggle = () => {
    if(themeCtx.value === THEME_DARK) {
      themeCtx.value = THEME_LIGHT;
    } else {
      themeCtx.value = THEME_DARK;
    }

    setRefresh(themeCtx.value);
  };

  languageCtx.update = (name) => {
    languageCtx.value = name;

    setRefresh(languageCtx.value);
  }

  return (
    <>
      <LanguageContext.Provider value={languageCtx}>
        <ThemeContext.Provider value={themeCtx}>
          <SearchPage />
        </ThemeContext.Provider>
      </LanguageContext.Provider>
    </>
  );
}

export default App;
