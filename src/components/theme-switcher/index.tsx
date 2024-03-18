import React, { useEffect } from "react";

import { ACTION_TYPES } from "../../shared/enums";
import { THEMES } from "../../util";
import { useAppContext } from "../../context/use-app-context";

const ThemeSwitcher = () => {
  const { handleDispatch } = useAppContext();
  const [selectedTheme, setSelectedTheme] = React.useState(
    Object.keys(THEMES)[0]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTheme(event.target.value);
  };
  useEffect(() => {
    handleDispatch({
      type: ACTION_TYPES.SWITCH_THEME,
      payload: { theme: Number(selectedTheme) }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);

  return (
    <div className="theme-switcher">
      {Object.keys(THEMES).map((theme) => (
        <label key={theme} className="flex items-center mr-4">
          <input
            type="radio"
            id={theme}
            name="theme"
            value={theme}
            checked={selectedTheme === theme}
            onChange={handleChange}
            className="mr-2 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
          Theme {theme}
        </label>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
