// src/app/concerts/page.tsx
import Navigation from '../components/navbar/Navbar';
import '../styles/page.css';
import ConcertList from "@/app/components/ConcertList";

const Concert = () => {
    return (
        <div className="home-container">
            <div className="home-background"></div>
            <Navigation />
            <ConcertList className="concerts-concert-list concerts-grid" />
        </div>
    );
};

export default Concert;