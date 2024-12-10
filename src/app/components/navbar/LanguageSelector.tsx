// src/app/components/navbar/LanguageSelector.tsx
import React from "react";
import i18n from "../../../i18n";

const LanguageSelector: React.FC = () => {
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="language-selector">
            <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
                <option value="en">English</option>
                <option value="zh">中文</option>
            </select>
        </div>
    );
};

export default LanguageSelector;