import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#f0f3f4] hover:bg-[#e0e6e8] dark:bg-slate-800 dark:hover:bg-slate-700 text-[#121617] dark:text-gray-300 transition-colors"
            title="Toggle Theme"
        >
            <span className="material-symbols-outlined text-[20px]">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
    );
}
