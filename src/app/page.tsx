// src/app/page.tsx
import Navbar from "./components/navbar/Navbar";
import ConcertList from "./components/ConcertList";
import "./styles/page.css";

export default function Home() {
    return (
        <div className="home-container">
            <Navbar />

            <section className="image-section">
                <div className="image-background"></div>
                <div className="content-wrapper">
                    <div className="concert-container">
                        <ConcertList className="home-concert-list home-grid" />
                    </div>
                </div>
            </section>

            <section className="hero-section">
                <video autoPlay loop muted playsInline className="hero-video">
                    <source src="/video/coldplay.mp4" type="video/mp4" />
                </video>
            </section>
        </div>
    );
}
