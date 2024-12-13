"use client";

import React, { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarToggle from "./NavbarToggle";
import NavbarMenu from "@/app/components/navbar/NarbarMenu";
import LanguageSelector from "./LanguageSelector";
import "../../styles/Navbar.css";
import Login from "../Login";
import Image from "next/image";

export const UserInteractionContext = React.createContext({
    hasInteracted: false,
    setHasInteracted: (value: boolean) => {},
});

interface MenuItem {
    name: string;
    path: string;
    color: string;
}

const Navbar = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { hasInteracted, setHasInteracted } = useContext(
        UserInteractionContext
    );
    const pathname = usePathname();

    const menuItems: MenuItem[] = [
        { name: "Home", path: "/", color: "#FF6B6B" },
        { name: "Concert", path: "/concerts", color: "#FFD93D" },
        { name: "News", path: "/news", color: "#4D96FF" },
        { name: "Song list", path: "/song-list", color: "#FF9F9F" },
        { name: "My order", path: "/orders", color: "#6A5ACD" },
    ];

    useEffect(() => {
        const currentIndex = menuItems.findIndex(
            (item) => item.path === pathname
        );
        setActiveIndex(currentIndex);
    }, [pathname]);

    const handleGlobalClick = () => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
    };

    return (
        <UserInteractionContext.Provider
            value={{ hasInteracted, setHasInteracted }}
        >
            <div onClick={handleGlobalClick}>
                <NavbarToggle
                    isMenuOpen={isMenuOpen}
                    toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
                />
                <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
                    <div className="navbar-container">
                        <div className="left-section">
                            <div className="navbar-logo">
                                <Image
                                    src="/image/navbar-logo.png"
                                    alt="logo"
                                    width={150}
                                    height={0}
                                />
                            </div>
                            <NavbarMenu
                                menuItems={menuItems}
                                pathname={pathname}
                                setActiveIndex={setActiveIndex}
                                setIsMenuOpen={setIsMenuOpen}
                            />
                        </div>
                        <div className="right-section">
                            <LanguageSelector />
                            <Login />
                        </div>
                    </div>
                </nav>
            </div>
        </UserInteractionContext.Provider>
    );
};

export default Navbar;
