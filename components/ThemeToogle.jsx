import { useState, useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import Image from "next/image";
import Logo from '@/public/images/logo.png'

export default function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Loading state to control the loader visibility

    // Check saved theme preference from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            document.documentElement.classList.add(savedTheme);
            setIsDarkMode(savedTheme === "dark");
        } else {
            // Default to light mode
            document.documentElement.classList.add("light");
        }

        // Simulate page load for a few seconds before hiding the loader
        setTimeout(() => {
            setIsLoading(false); // Hide loader after page load is simulated
        }, 1000); // 1-second delay (adjust as needed)
    }, []);

    // Toggle theme with a timeout to show loader
    const toggleTheme = () => {
        setIsLoading(true); // Show loader when toggling the theme

        setTimeout(() => {
            // After the timeout, toggle the dark/light mode
            if (document.documentElement.classList.contains("dark")) {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
                setIsDarkMode(false);
            } else {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
                setIsDarkMode(true);
            }

            setIsLoading(false); // Hide loader after theme change
        }, 1000); // 500ms delay (adjust as needed)
    };

    return (
        <div>
            {/* Loader: Visible during page load and theme toggle */}
            {isLoading && (
                <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center items-center gap-1">
                        <Image src={Logo} alt='logo Image skysense' className='md:h-14 md:w-14 h-12 w-12' />
                        <h2 className='text-2xl text-black dark:text-white'>SkySense</h2>
                    </div>
                    <div className="w-8 h-8 border-4 border-t-transparent border-sky-400 rounded-full animate-spin"></div>
                    </div>
                </div>

            )}

            {/* Dark Mode Toggle Button */}
            <button
                onClick={toggleTheme}
                className={`h-10 w-10 text-2xl text-orange-300 hover:bg-[#1B1B1D] flex justify-center items-center rounded-full transition-all duration-300 ${isDarkMode ? 'block' : 'hidden'}`}
            >
                <MdLightMode />
            </button>

            {/* Light Mode Toggle Button */}
            <button
                onClick={toggleTheme}
                className={`h-10 w-10 text-2xl text-black flex justify-center items-center rounded-full hover:bg-zinc-100 transition-all duration-300 ${isDarkMode ? 'hidden' : 'block'}`}
            >
                <MdDarkMode />
            </button>
        </div>
    );
}
