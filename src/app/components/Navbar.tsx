"use client";

import React, { useEffect, useState, useContext } from "react";
import { usePathname } from "next/navigation";
import NavbarToggle from "./NavbarToggle";
import NavbarMenu from "@/app/components/NarbarMenu";
import LanguageSelector from "./LanguageSelector";
import AudioPlayer from "./AudioPlayer";
import "../styles/Navbar.css";
import Login from "../components/Login";

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

    const playOnPaths = ["/concerts", "/my-tickets"];

    const menuItems: MenuItem[] = [
        { name: "Home", path: "/", color: "#FF6B6B" },
        { name: "Concert", path: "/concerts", color: "#FFD93D" },
        { name: "My tickets", path: "/my-tickets", color: "#6BCB77" },
        { name: "News", path: "/news", color: "#4D96FF" },
        { name: "Song list", path: "/song-list", color: "#FF9F9F" },
        { name: "User Profile", path: "/profile", color: "#6FEDD6" },
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
                        <NavbarMenu
                            menuItems={menuItems}
                            pathname={pathname}
                            setActiveIndex={setActiveIndex}
                            setIsMenuOpen={setIsMenuOpen}
                        />
                        <LanguageSelector />
                        <Login />
                        <AudioPlayer playOnPaths={playOnPaths} />
                    </div>
                </nav>
            </div>
        </UserInteractionContext.Provider>
    );
};

export default Navbar;
