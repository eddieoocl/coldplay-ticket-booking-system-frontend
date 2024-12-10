// scr/app/components/navbar/AudioPlayer.tsx
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface MenuItem {
    name: string;
    path: string;
    color: string;
}

interface NavbarMenuProps {
    menuItems: MenuItem[];
    pathname: string;
    setActiveIndex: (index: number) => void;
    setIsMenuOpen: (isOpen: boolean) => void;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ menuItems, pathname, setActiveIndex, setIsMenuOpen }) => {
    const { t } = useTranslation();

    return (
        <ul className="navbar-menu">
            {menuItems.map((item, index) => (
                <li key={index} className="navbar-list">
                    <Link
                        href={item.path}
                        className={`navbar-link ${pathname === item.path ? "active" : ""}`}
                        style={{ '--active-color': pathname === item.path ? item.color : 'white' } as React.CSSProperties}
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
    );
};

export default NavbarMenu;