'use client';
import React from 'react';
import Image from 'next/image';
import { FaLocationDot } from 'react-icons/fa6';

const WeatherCardToday = ({ weatherData }) => {
    if (!weatherData || !weatherData.location || !weatherData.current) {
        // Display a placeholder or loading state while waiting for data
        return (
            <section className="md:min-h-[16rem] md:min-w-[28rem] p-6 h-[14rem] min-w-full bg-zinc-100 text-black dark:bg-[#1B1B1D] dark:text-white rounded-3xl flex justify-center items-center">
                <h2 className="text-lg text-zinc-500 dark:text-zinc-400">Loading weather data...</h2>
            </section>
        );
    }

    // Convert the localtime to a Date object
    const localTime = new Date(weatherData.location.localtime);

    // Format the date as day-month-year
    const formattedDate = localTime.toLocaleDateString('en-GB'); // Formats as DD/MM/YYYY

    // Get the day of the week
    const dayName = localTime.toLocaleDateString('en-US', { weekday: 'long' });

    // Map weather conditions to images
    const getWeatherIcon = (conditionText) => {
        const formattedCondition = conditionText.toLowerCase().replace(/\s+/g, '-'); // e.g., "Heavy Snow" -> "heavy-snow"
        const iconPath = `/weather-icons/${formattedCondition}.png`;

        // Check if the image exists, otherwise use a default image
        try {
            const icon = require(`@/public/weather-icons/${formattedCondition}.png`);
            return iconPath;
        } catch (error) {
            return '/weather-icons/default.png'; // Path to your default icon
        }
    };


    const weatherIcon = getWeatherIcon(weatherData.current.condition.text);

    return (
        <section className="md:min-h-[16rem] md:min-w-[28rem] p-6 h-[14rem] min-w-full bg-zinc-100 text-black dark:bg-[#1B1B1D] dark:text-white rounded-3xl flex justify-between items-center">
            <div className="min-h-full flex flex-col justify-between">
                {/* Location */}
                <div className="px-3 py-1 w-fit bg-[#742BEC] text-white text-sm rounded-2xl flex justify-center items-center gap-1">
                    <FaLocationDot />
                    <h4>{weatherData.location.name}</h4>
                </div>

                {/* Day & Date */}
                <h1 className="md:text-5xl text-3xl capitalize">{dayName}</h1>
                <h4 className="md:text-2xl">{formattedDate}</h4>

                {/* Weather Temperature */}
                <div>
                    <h1 className="md:text-5xl text-3xl">
                        {weatherData.current.temp_c}&#176;<span>C</span>
                    </h1>
                </div>
            </div>

            {/* Weather Condition Image */}
            <div className="flex flex-col items-center">
                <Image
                    src={weatherIcon}
                    alt={weatherData.current.condition.text}
                    width={160} // Size for md:h-[10rem]
                    height={160} // Size for md:w-[10rem]
                    className="md:h-[10rem] md:w-[10rem] h-[9rem] w-[9rem]"
                />
                <h2 className="text-lg">{weatherData.current.condition.text}</h2>
            </div>
        </section>
    );
};

export default WeatherCardToday;
