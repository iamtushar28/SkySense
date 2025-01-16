'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '@/public/images/logo.png';
import DeskSearchBar from './DeskSearchBar';
import MobileSearchBar from './MobileSearchBar';

const Navbar = ({ onCitySelect }) => {
    return (
        <nav className='p-4 flex justify-between items-center shadow-sm dark:border-b dark:border-b-[#1B1B1D]'>
            {/* application logo */}
            <div className='flex justify-center items-center gap-1'>
                <Image src={Logo} alt='logo Image skysense' className='md:h-12 md:w-12 h-8 w-8' />
                <h2 className='md:text-xl text-black dark:text-white'>SkySense</h2>
            </div>

            {/* searchbar desktop */}
            <DeskSearchBar onCitySelect={onCitySelect} />

            {/* mobile searchbar */}
            <MobileSearchBar onCitySelect={onCitySelect} />
        </nav>
    );
}

export default Navbar;
