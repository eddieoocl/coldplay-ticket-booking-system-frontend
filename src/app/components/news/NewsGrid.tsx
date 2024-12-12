"use client";

// src/app/components/news/NewsGrid.tsx
import { useTranslation } from "react-i18next";
import "../../styles/NewsGrid.css";

interface NewsGrid {
    id: number;
    date: string;
    category: string;
    title: string;
    description: string;
    image: string;
    featured?: boolean;
}

const NewsGrid = () => {
    const { t } = useTranslation();

    const newsData: NewsGrid[] = [
        {
            id: 1,
            date: "2024-12-12",
            category: t("Press Release"),
            title: t("News 1 Title"),
            description: t("News 1 Description"),
            image: "/image/coldplay-emergency-concert.jpg",
            featured: true
        },
        {
            id: 2,
            date: "2024-11-20",
            category: t("Blog"),
            title: t("News 2 Title"),
            description: t("News 2 Description"),
            image: "/image/coldplay-studio.jpg",
        },
        {
            id: 3,
            date: "2024-10-25",
            category: t("Event"),
            title: t("News 3 Title"),
            description: t("News 3 Description"),
            image: "/image/coldplay-fans.jpg",
        },
        {
            id: 4,
            date: "2024-09-20",
            category: t("Press Release"),
            title: t("News 4 Title"),
            description: t("News 4 Description"),
            image: "/image/coldplay-environment.jpg",
            featured: true,
        }
    ];

    return (
        <div className="news-grid-container">
            <div className="news-grid">
                {newsData.map((item) => (
                    <article
                        key={item.id}
                        className={`news-item ${item.featured ? "featured" : ""}`}
                    >
                        <div className="news-item-content">
                            <div className="news-meta">
                                <span className="news-date">{item.date}</span>
                                <span className="news-category">
                                    {item.category}
                                </span>
                            </div>
                            <h2 className="news-title">{item.title}</h2>
                            <p className="news-description">
                                {item.description}
                            </p>
                        </div>
                        <div
                            className="news-image"
                            style={{ backgroundImage: `url(${item.image})` }}
                        />
                    </article>
                ))}
            </div>
        </div>
    );
};

export default NewsGrid;