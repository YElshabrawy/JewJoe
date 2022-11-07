import React, { useState } from 'react';
// Components
import Hamburger from 'hamburger-react';
import Search from './Search';
// Icons
import CartIcon from './Icons/CartIcon';
import SearchIcon from './Icons/SearchIcon';
import Profile from './Icons/Profile';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = ['Shop', 'Blog', 'Our Story'].map((item, i) => {
        return (
            <h5
                className="text-h4 mb-4 cursor-pointer hover:text-main md:mr-16 md:text-h5 md:mb-0"
                key={i}
            >
                {item}
            </h5>
        );
    });
    return (
        <nav className="p-4 md:flex md:items-center md:justify-between">
            {/* Logo and icons */}
            <div className="flex justify-between items-center">
                {/* logo */}
                <img className="cursor-pointer" src="/logo.svg" alt="" />
                {/* Right Hand Side */}
                <div className="md:hidden -mr-2 flex items-center">
                    {/* Cart */}
                    <button className="text-3xl text-black mr-4">
                        <CartIcon items={0} />
                    </button>

                    {/* Hamburger */}
                    <Hamburger
                        size={20}
                        rounded
                        toggled={isOpen}
                        toggle={setIsOpen}
                    />
                </div>
            </div>
            {/* Nav items */}
            <div
                className={
                    (isOpen ? 'block' : 'hidden') + ' md:flex md:divide-x'
                }
            >
                {/* Nav Items */}
                <div className="flex flex-col items-center justify-center md:flex md:flex-row">
                    {navItems}
                </div>
                {/* Desktop Icons */}
                <div className="hidden md:flex">
                    <button className="w-4 ml-12">
                        <SearchIcon />
                    </button>
                    <button className="text-3xl ml-10">
                        <CartIcon items={2} />
                    </button>
                    <button className="w-5 text-3xl ml-10">
                        <Profile />
                    </button>
                </div>
            </div>
            {/* Search Bar */}
            <Search />
        </nav>
    );
};

export default NavBar;
