// src/app/page.tsx
import Navbar from './components/navbar/Navbar';
import ConcertList from './components/ConcertList';
import VideoPlayer from './components/VideoPlayer';
import './styles/page.css';

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-background"></div>
            <Navbar/>
            <div className="concert-container">
                <ConcertList className="home-concert-list home-grid" />
            </div>
            <div className="video-container">
                <VideoPlayer/>
            </div>
        </div>
    );
}