"use client";
import { createContext, useEffect, useState } from "react";


interface ThemeContextType {
  theme: string;
  changeTheme: (theme: string) => void;
}
export const ThemeContext = createContext<ThemeContextType>({});

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme)
  }, []);

  const changeTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme)
  };


  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}