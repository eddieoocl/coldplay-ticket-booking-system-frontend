// src/app/components/Navbar.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import "../styles/Navbar.css";

interface MenuItem {
    name: string;
    path: string;
    color: string;
}

const Navbar = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const menuItems: MenuItem[] = [
        { name: "Home", path: "/", color: "#FF6B6B" },
        { name: "Concert", path: "/concerts", color: "#FFD93D" },
        { name: "My tickets", path: "/my-tickets", color: "#6BCB77" },
        { name: "News", path: "/news", color: "#4D96FF" },
        { name: "Song list", path: "/song-list", color: "#FF9F9F" },
        { name: "User Profile", path: "/profile", color: "#6FEDD6" },
    ];

    useEffect(() => {
        const currentIndex = menuItems.findIndex(item => item.path === pathname);
        setActiveIndex(currentIndex);
    }, [pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <>
            <div className={`navbar-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
                <div className="navbar-container">
                    <ul className="navbar-menu">
                        {menuItems.map((item, index) => (
                            <li key={index} className="navbar-list">
                                <Link
                                    href={item.path}
                                    className={`navbar-link ${pathname === item.path ? "active" : ""}`}
                                    style={{
                                        color: pathname === item.path ? item.color : "white",
                                        backgroundColor: pathname === item.path ? "rgba(255, 255, 255, 0.1)" : "transparent",
                                    }}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    {t(item.name)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="language-selector">
                        <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
                            <option value="en">English</option>
                            <option value="zh">中文</option>
                        </select>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
