// src/app/news/page.tsx
import Navbar from '../components/navbar/Navbar';
import NewsGrid from '../components/news/NewsGrid';
import '../styles/page.css';

const Page = () => {
    return (
        <div className="home-container">
            <div className="home-background"></div>
            <Navbar />
            <main className="news-main">
                <NewsGrid />
            </main>
        </div>
    );
};

export default Page;