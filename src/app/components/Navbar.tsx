// src/app/components/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../styles/Navbar.css';

const Navbar = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { name: 'Home', path: '/', color: '#FF6B6B' },
        { name: 'Concert', path: '/concerts', color: '#FFD93D' },
        { name: 'My tickets', path: '/my-tickets', color: '#6BCB77' },
        { name: 'News', path: '/news', color: '#4D96FF' },
        { name: 'Song list', path: '/song-list', color: '#FF9F9F' },
        { name: 'User Profile', path: '/profile', color: '#6FEDD6' }
    ];

    useEffect(() => {
        const currentIndex = menuItems.findIndex(item => item.path === pathname);
        setActiveIndex(currentIndex);
    }, [pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
                <div className="navbar-container">
                    <ul className="navbar-menu">
                        {menuItems.map((item, index) => (
                            <li key={index} className="navbar-list">
                                <Link
                                    href={item.path}
                                    className={`navbar-link ${pathname === item.path ? 'active' : ''}`}
                                    style={{
                                        color: pathname === item.path ? item.color : 'white',
                                        backgroundColor: pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                                    }}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;