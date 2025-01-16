import React from 'react';
import Image from 'next/image';

const WeatherOfWeek = ({ forecastData }) => {
    // Extract the forecast for the next 7 days
    const forecastDays = forecastData?.forecast?.forecastday || [];

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

    return (
        <section>
            <h2 className="text-black dark:text-white">Weather Next 7 Days</h2>

            {/* Days */}
            <section className="flex overflow-x-auto scroll-smooth gap-4 mt-2 scroll-container">
                {forecastDays.map((day, index) => {
                    const date = new Date(day.date);
                    const dayName = date.toLocaleString('en-us', { weekday: 'long' });
                    const dateString = date.toLocaleString('en-us', { day: '2-digit', month: 'short' });

                    // Get weather icon for the day's condition
                    const weatherIcon = getWeatherIcon(day.day.condition.text);

                    return (
                        <div
                            key={index}
                            className="h-auto md:min-w-[5rem] min-w-[8rem] flex gap-2 py-2 px-2 flex-col justify-center items-center rounded-xl bg-zinc-100 text-black dark:bg-[#1B1B1D] dark:text-white"
                        >
                            <div className="border-b py-1 flex flex-col items-center justify-center">
                                {/* Day */}
                                <h2 className="text-sm capitalize">{dayName}</h2>

                                {/* Date */}
                                <h2 className="text-sm capitalize">{dateString}</h2>
                            </div>

                            {/* Weather Condition Image */}
                            <Image
                                src={weatherIcon}
                                alt={day.day.condition.text}
                                width={64} // Adjust based on design (e.g., 4rem)
                                height={64}
                                className="h-[4rem] w-[4rem]"
                                onError={(e) => (e.target.src = '/weather-icons/default.png')} // Fallback to default image
                            />

                            {/* Temperature */}
                            <h4 className="">{day.day.avgtemp_c}&#176;c</h4>
                        </div>
                    );
                })}
            </section>
        </section>
    );
};

export default WeatherOfWeek;

