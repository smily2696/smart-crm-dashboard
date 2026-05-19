import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext =
  createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({
  children
}: any) => {

  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {

    const storedTheme =
      localStorage.getItem("theme");

    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

  }, []);

  const toggleTheme = () => {

    setDarkMode((prev) => {

      const newTheme = !prev;

      if (newTheme) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      return newTheme;
    });
  };

  return (

    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {

  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be inside ThemeProvider"
    );
  }

  return context;
};