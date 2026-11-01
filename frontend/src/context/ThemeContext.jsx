import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getMuiTheme } from "../theme/themeConfig";

const ThemeContext = createContext({
  themeMode: "dark",
  isDark: true,
  toggleTheme: () => {},
  setThemeMode: () => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeModeState] = useState(() => {
    try {
      const saved = localStorage.getItem("parlor_theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      // ignore storage access issues
    }
    return "dark"; // Default to dark for sleek high-end aesthetics
  });

  const isDark = themeMode === "dark";

  useEffect(() => {
    try {
      localStorage.setItem("parlor_theme", themeMode);
    } catch {
      // ignore storage access issues
    }

    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.style.colorScheme = "light";
    }
  }, [themeMode, isDark]);

  const toggleTheme = () => {
    setThemeModeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setThemeMode = (mode) => {
    if (mode === "dark" || mode === "light") {
      setThemeModeState(mode);
    }
  };

  const muiTheme = useMemo(() => getMuiTheme(themeMode), [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, isDark, toggleTheme, setThemeMode }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
