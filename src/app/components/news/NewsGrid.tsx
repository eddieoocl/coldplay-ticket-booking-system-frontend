// src/app/components/news/NewsGrid.tsx
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

const newsData: NewsGrid[] = [
    {
        id: 1,
        date: "2024-12-10",
        category: "PRESS RELEASE",
        title: "Company announces groundbreaking innovation",
        description:
            "Leading the way in technological advancement with revolutionary new products.",
        image: "/image/news-1.jpg",
        featured: true,
    },
    {
        id: 2,
        date: "2024-11-15",
        category: "EVENT",
        title: "Annual Tech Conference 2024",
        description:
            "Join us for a day of insightful talks and networking with industry leaders.",
        image: "/image/news-2.jpg",
    },
    {
        id: 3,
        date: "2024-10-05",
        category: "BLOG",
        title: "The future of AI in everyday life",
        description:
            "Exploring how artificial intelligence is transforming our daily routines.",
        image: "/image/news-1.jpg",
    },
    {
        id: 4,
        date: "2024-09-20",
        category: "PRESS RELEASE",
        title: "New partnership with leading tech firm",
        description:
            "Announcing a strategic partnership to drive innovation and growth.",
        image: "/image/news-1.jpg",
        featured: true,
    },
    {
        id: 5,
        date: "2024-08-30",
        category: "BLOG",
        title: "Top 10 tech trends to watch in 2025",
        description:
            "A look at the most promising technologies set to shape the future.",
        image: "/image/news-2.jpg",
    },
    {
        id: 6,
        date: "2024-07-25",
        category: "EVENT",
        title: "Startup Pitch Day 2024",
        description:
            "Join us for an exciting day of pitches from the hottest new startups. ",
        image: "/image/news-1.jpg",
    },
    {
        id: 7,
        date: "2024-06-15",
        category: "PRESS RELEASE",
        title: "Company named among fastest-growing tech firms",
        description:
            "Recognized for our rapid growth and innovation in the technology sector.",
        image: "/image/news-2.jpg",
    },
];

const NewsGrid = () => {
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
