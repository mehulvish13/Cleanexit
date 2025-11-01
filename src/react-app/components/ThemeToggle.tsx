import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const shouldDark = saved ? saved === 'dark' : getSystemPrefersDark();
    setIsDark(shouldDark);
    document.documentElement.classList.toggle('dark', shouldDark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
    </button>
  );
}
