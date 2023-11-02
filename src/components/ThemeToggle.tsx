import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useTheme } from "./ThemeProvider";

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    if (theme === "night") {
      setTheme("winter");
    } else {
      setTheme("night");
    }
  };

  return (
    <label className="swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "night"}
      />
      <BsSunFill className="h-4 w-4 swap-on" />
      <BsMoonFill className="h-4 w-4 swap-off" />
    </label>
  );
};
