// src/app/components/navbar/NavbarToggle.tsx
import React from "react";

interface NavbarToggleProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
}

const NavbarToggle: React.FC<NavbarToggleProps> = ({ isMenuOpen, toggleMenu }) => {
    return (
        <div className={`navbar-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
    );
};

export default NavbarToggle;