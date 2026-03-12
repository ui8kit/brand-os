import { useEffect, useState } from "react";
import { Button } from "@/components";

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem("tech-blog-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("tech-blog-theme", theme);
  }, [theme]);

  return (
    <Button
      variant="outline"
      size="xs"
      onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      data-class="site-theme-toggle"
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  );
}
