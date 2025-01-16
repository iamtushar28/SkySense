'use client'
import Navbar from "@/components/Navbar";
import Weather from "@/components/Weather";
import { useState } from 'react';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState('Satara');

  // Function to update selected city from Navbar
  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <>
      <Navbar onCitySelect={handleCitySelect} /> {/* Pass the handleCitySelect function */}
      <Weather selectedCity={selectedCity} /> {/* Pass the selected city */}
    </>
  );
}
