// src/app/song-list/page.tsx
import Navigation from '../components/navbar/Navbar';
import '../styles/page.css';

const Page = () => {
    return (
        <div className="home-container">
            <div className="home-background"></div>
            <Navigation />
        </div>
    );
};

export default Page;