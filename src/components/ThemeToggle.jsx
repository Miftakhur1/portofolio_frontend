export default function ThemeToggle() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded-md border text-sm
                 dark:border-gray-600 dark:text-gray-200"
    >
      🌙 / ☀️
    </button>
  );
}
