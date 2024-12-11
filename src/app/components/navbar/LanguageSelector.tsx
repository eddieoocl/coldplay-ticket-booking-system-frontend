// src/app/components/LanguageSelector.tsx
import React from "react";
import i18n from "../../../i18n";
import { GlobeAltIcon } from "@heroicons/react/solid";
import "../../styles/LanguageSelector.css"; // Import the custom CSS file

const LanguageSelector: React.FC = () => {
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="relative inline-block text-left">
            <div className="flex items-center space-x-2 bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300">
                <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                <select
                    className="custom-select bg-transparent text-white focus:outline-none"
                    onChange={(e) => changeLanguage(e.target.value)}
                    defaultValue={i18n.language}
                >
                    <option className="custom-option" value="en">English</option>
                    <option className="custom-option" value="zh">中文</option>
                </select>
            </div>
        </div>
    );
};

export default LanguageSelector;