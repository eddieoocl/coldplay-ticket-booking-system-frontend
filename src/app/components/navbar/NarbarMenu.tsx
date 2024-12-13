import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";

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

const NavbarMenu: React.FC<NavbarMenuProps> = ({
    menuItems,
    pathname,
    setActiveIndex,
    setIsMenuOpen,
}) => {
    const { data: session } = useSession();
    const { t } = useTranslation();

    return (
        <ul className="navbar-menu">
            {menuItems
                .map((item, index) => {
                    if (item.name === "My order" && !session) {
                        return null;
                    }
                    return (
                        <li key={index} className="navbar-list">
                            <Link
                                href={item.path}
                                className={`navbar-link ${pathname === item.path ? "active" : ""}`}
                                style={
                                    {
                                        "--active-color":
                                            pathname === item.path
                                                ? item.color
                                                : "white",
                                    } as React.CSSProperties
                                }
                                onClick={() => {
                                    setActiveIndex(index);
                                    setIsMenuOpen(false);
                                }}
                            >
                                {t(item.name)}
                            </Link>
                        </li>
                    );
                })
                .filter((item) => item !== null)}
        </ul>
    );
};

export default NavbarMenu;
