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
            title: "🔥 Coldplay Adds Emergency Concert Due to High Demand 🔥",
            description:
                "Due to overwhelming demand, Coldplay has announced an emergency additional concert on December 20, 2024. This unexpected event is a testament to the band's immense popularity and the dedication of their fans. Attendees can look forward to an unforgettable night filled with electrifying performances, stunning visuals, and an atmosphere charged with excitement and energy. The concert will feature a mix of Coldplay's classic hits and new tracks, ensuring a memorable experience for all. Don't miss this unique opportunity to see one of the world's most beloved bands live in action.",
            image: "/image/coldplay-emergency-concert.jpg",
            featured: true,
        },
        {
            id: 2,
            date: "2024-11-20",
            category: t("Blog"),
            title: "Behind the Scenes: Making of the New Album",
            description:
                "Get an exclusive look at the creative process behind Coldplay's latest album.",
            image: "/image/coldplay-studio.jpg",
        },
        {
            id: 3,
            date: "2024-11-08",
            category: t("Blog"),
            title: "Top 10 Coldplay Songs of All Time - Fan Picks",
            description:
                "A look at the most iconic and beloved songs from Coldplay's extensive discography.",
            image: "/image/coldplay-top10.jpg",
        },
        {
            id: 4,
            date: "2024-11-02",
            category: t("Event"),
            title: "Coldplay World Tour 2024",
            description:
                "\"Join Coldplay on their highly anticipated world tour, where they will be performing in major cities across the globe. Experience the magic of their live performances, featuring a mix of their classic hits and new tracks from their latest album. Don't miss the chance to see one of the world's most iconic bands in action, creating unforgettable memories for fans everywhere.\"",
            image: "/image/coldplay-tour.png",
            featured: true,
        },
        {
            id: 5,
            date: "2024-09-20",
            category: t("Press Release"),
            title: "Coldplay Partners with Environmental Organizations",
            description:
                '"Coldplay announces a new partnership with leading environmental organizations to promote sustainability. This collaboration aims to support various environmental initiatives, focusing on reducing carbon footprints, promoting renewable energy, and raising awareness about climate change. Together, they plan to implement eco-friendly practices in their tours and productions, ensuring a greener future for the music industry and beyond."',
            image: "/image/coldplay-environment.jpg",
            featured: true,
        },
        {
            id: 6,
            date: "2024-07-25",
            category: t("Event"),
            title: "Coldplay Fan Meetup 2024 - Los Angeles",
            description:
                "Join fellow Coldplay fans for a day of music, fun, and community at the annual fan meetup.",
            image: "/image/coldplay-fans.jpg",
        },
        {
            id: 7,
            date: "2024-06-15",
            category: t("Press Release"),
            title: "Coldplay Wins Prestigious Music Award",
            description:
                "Coldplay is honored with a prestigious award for their contributions to the music industry.",
            image: "/image/coldplay-award.jpg",
        },
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
