"use client";
// src/app/news/page.tsx

import { useTranslation } from "react-i18next";
import Navbar from "../components/navbar/Navbar";
import NewsGrid from "../components/news/NewsGrid";
import "../styles/page.css";
import "../styles/NewsGrid.css";


const Page = () => {
    const { t } = useTranslation();

    return (
        <div className="home-container">
            <div className="home-background"></div>
            <Navbar />
            <main className="news-main">
                <div className="news-header">
                    <div className="news-h1-title">
                        <h1 className="news-h1-title-text">{t("Latest News")}</h1>
                    </div>
                </div>
                <NewsGrid />
            </main>
        </div>
    );
};

export default Page;