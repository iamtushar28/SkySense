'use client'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Logo from '@/public/images/logo.png';
import WeatherCardToday from './WeatherCardToday';
import WeatherDetailsToday from './WeatherDetailsToday';
import WeatherOfWeek from './WeatherOfWeek';

const Weather = ({ selectedCity }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Custom loader delay (e.g., 1 second)
    const MIN_LOADING_TIME = 1000; // in milliseconds

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // Show loading spinner initially
                setLoading(true);

                // Fetch current weather for the selected city
                const response = await fetch(`/api/current?city=${selectedCity}`);
                const data = await response.json();
                setWeatherData(data);

                // Fetch forecast data for 7 days
                const forecastResponse = await fetch(`/api/forecast?city=${selectedCity}`);
                const forecast = await forecastResponse.json();
                setForecastData(forecast);

                // Simulate a custom loader delay
                setTimeout(() => {
                    setLoading(false); // hide loader after the delay
                }, MIN_LOADING_TIME);
            } catch (error) {
                setError('Failed to fetch weather data');
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [selectedCity]); // Trigger when city changes

    if (loading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center z-50">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center items-center gap-1">
                        <Image src={Logo} alt="logo Image skysense" className="md:h-14 md:w-14 h-12 w-12" />
                        <h2 className="text-2xl text-black dark:text-white">SkySense</h2>
                    </div>
                    <div className="w-8 h-8 border-4 border-t-transparent border-sky-400 rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {/* Weather Card Today */}
            <section className="p-4 flex md:flex-row flex-col gap-4">
                <WeatherCardToday weatherData={weatherData} />
                <WeatherDetailsToday weatherData={weatherData} />
            </section>

            {/* Weather Forecast */}
            <section className="p-4 flex justify-center md:flex-row flex-col md:gap-10 gap-4">
                <WeatherOfWeek forecastData={forecastData} />
            </section>
        </>
    );
};

export default Weather;
