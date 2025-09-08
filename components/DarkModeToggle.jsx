"using client"

import { useState } from "react";

export default function DarkModeToggle() {
 const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
      const newTheme = theme == "light" ? "dark" : "light";
      setTheme(newTheme);
      document.documentElement.classList.toggle("dark", newTheme == "dark")
  }
}