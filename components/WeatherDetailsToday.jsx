'use client';
import React from 'react';
import Image from 'next/image';
import WindSpeed from '@/public/images/wind.png';
import Humidity from '@/public/images/humidity.png';
import UVraise from '@/public/images/uv.png';
import Visibility from '@/public/images/visibility.png';

const WeatherDetailsToday = ({ weatherData }) => {
    // Add a fallback if weatherData or its current property is not available
    const windSpeed = weatherData?.current?.wind_kph ?? 'N/A';
    const humidity = weatherData?.current?.humidity ?? 'N/A';
    const visibility = weatherData?.current?.vis_km ?? 'N/A';
    const uvIndex = weatherData?.current?.uv ?? 'N/A';

    return (
        <section className="w-full flex flex-col justify-around">
            <h4 className="text-black dark:text-white">Today Highlights</h4>

            <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between gap-4 md:gap-0 mt-2 md:mt-0">
                {/* Wind Speed */}
                <div className="md:h-[13rem] md:w-[11rem] h-[10rem] w-[9rem] bg-zinc-100 text-black dark:bg-[#1B1B1D] dark:text-white p-4 md:rounded-3xl rounded-xl">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-sm">Wind Speed</h2>
                        <Image
                            src={WindSpeed}
                            alt="Wind Speed"
                            className="md:h-[8rem] md:w-[8rem] h-[5rem] w-[5rem]"
                        />
                        <h2 className="text-lg">{windSpeed} km/h</h2>
                    </div>
                </div>

                {/* Humidity */}
                <div className="md:h-[13rem] md:w-[11rem] h-[10rem] w-[9rem] p-4 bg-zinc-100 text-black dark:bg-[#1B1B1D] dark:text-white md:rounded-3xl rounded-xl">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-sm">Humidity</h2>
                        <Image
                            src={Humidity}
                            alt="Humidity"
                            className="md:h-[8rem] md:w-[8rem] h-[5rem] w-[5rem]"
                        />
                        <h2 className="text-lg">{humidity}%</h2>
                    </div>
                </div>

                {/* Visibility */}
                <div className="md:h-[13rem] md:w-[11rem] h-[10rem] w-[9rem] p-4 bg-zinc-100 text-black dark:bg-[#1B1B1D] dark:text-white md:rounded-3xl rounded-xl">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-sm">Visibility</h2>
                        <Image
                            src={Visibility}
                            alt="Visibility"
                            className="md:h-[8rem] md:w-[8rem] h-[5rem] w-[5rem]"
                        />
                        <h2 className="text-lg">{visibility} km</h2>
                    </div>
                </div>

                {/* UV Index */}
                <div className="md:h-[13rem] md:w-[11rem] h-[10rem] w-[9rem] p-4 bg-zinc-100 text-black dark:bg-[#1B1B1D] dark:text-white md:rounded-3xl rounded-xl">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-sm">UV Index</h2>
                        <Image
                            src={UVraise}
                            alt="UV Index"
                            className="md:h-[8rem] md:w-[8rem] h-[5rem] w-[5rem]"
                        />
                        <h2 className="text-lg">{uvIndex} UV</h2>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeatherDetailsToday;
