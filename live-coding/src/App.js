import { useState, useContext } from "react";
import SearchPage from "./SearchPage";
import { THEME_DARK, THEME_LIGHT, ThemeContext } from "./ThemeContext";


function App() {
  const themeCtx = useContext(ThemeContext);
  const [theme, setTheme] = useState(themeCtx.value);

  themeCtx.toggle = () => {
    if(themeCtx.value === THEME_DARK) {
      themeCtx.value = THEME_LIGHT;
    } else {
      themeCtx.value = THEME_DARK;
    }

    setTheme(themeCtx.value);
  };

  return (
    <>
      <ThemeContext.Provider value={themeCtx}>
        <SearchPage />
      </ThemeContext.Provider>
    </>
  );
}

export default App;
