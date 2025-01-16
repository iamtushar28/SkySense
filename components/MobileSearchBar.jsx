'use client'
import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import ThemeToggle from './ThemeToogle';

const MobileSearchBar = ({ onCitySelect }) => {

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSearchbar, setSearchbar] = useState(false);

    const toggleSearchbar = () => {
        setSearchbar(!showSearchbar);
    };

    useEffect(() => {
        if (query.trim() === '') {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            setLoading(true);

            try {
                const response = await fetch(`api/autocomplete?query=${query}`);
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error('Error fetching autocomplete suggestions:', error);
            } finally {
                setLoading(false);
            }
        };

        const debounceFetch = setTimeout(fetchSuggestions, 300); // Debounce API requests
        return () => clearTimeout(debounceFetch);
    }, [query]);

    return (
        <div className='flex gap-1'>

            {/* Mobile searchbar */}
            {showSearchbar &&
                <div className='relative md:hidden block'>

                    {/* search input */}
                    <input
                        type="text"
                        placeholder='Search City'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='h-[40px] w-[200px] bg-zinc-100 text-black dark:bg-[#1E1E1E] dark:text-white rounded-lg placeholder:text-zinc-400 px-4 outline-none' />

                    {/* Search suggestions */}
                    {suggestions.length > 0 && (
                        <div className='w-[200px] h-fit bg-zinc-100 text-black dark:bg-[#1E1E1E] dark:text-white fixed top-[64px] rounded-lg shadow overflow-hidden'>
                            {suggestions.map((city, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        onCitySelect(city.name); // Pass the city to the parent component
                                        setQuery(''); // Set the selected city name in the input
                                        setSuggestions([]); // Clear suggestions
                                    }}
                                    className={`w-full flex gap-2 items-center text-xs
                                        ${index !== suggestions.length - 1 ? 'border-b dark:border-b-zinc-700' : ''} 
                                        text-start px-4 py-2 hover:bg-zinc-200 dark:hover:bg-[#1a1919] transition-all duration-300`}>
                                    <FaLocationDot />
                                    {city.name}, {city.region}, {city.country}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Close mobile searchbar button */}
                    <button
                        onClick={toggleSearchbar}
                        disabled={loading}
                        className='h-[40px] w-8 text-black bg-zinc-100 dark:bg-[#1E1E1E] dark:text-white text-2xl justify-center items-center rounded-r-lg transition-all duration-300 absolute right-0 top-0 bottom-0'>
                        {loading ? (
                            <div className="w-6 h-6 border-[3px] border-t-transparent border-sky-400 rounded-full animate-spin"></div>
                        ) : (
                            <RxCross2 />
                        )}
                    </button>
                </div>
            }

            {/* Open mobile searchbar button */}
            <button onClick={toggleSearchbar} className={`h-10 w-10 text-2xl text-black dark:text-white flex justify-center items-center rounded-full dark:hover:bg-[#1B1B1D] hover:bg-zinc-100 transition-all duration-300 md:hidden ${showSearchbar ? 'hidden' : 'block'}`}>
                <CiSearch />
            </button>

            {/* Toggle Theme Button (optional, if you still want to keep this) */}
            <div className={`${showSearchbar ? 'hidden' : 'block'}`}>
                <ThemeToggle />
            </div>

        </div>
    )
}

export default MobileSearchBar;
