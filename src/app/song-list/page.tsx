// src/app/song-list/page.tsx
'use client';

import { useState, useContext } from 'react';
import Navigation from "../components/navbar/Navbar";
import "../styles/page.css";
import "../styles/SongList.css";
import { RootLayoutContext } from '../layout';

interface Song {
    id: number;
    title: string;
    album: string;
    year: string;
    duration: string;
    imageUrl: string;
    audioUrl: string;
}

const SongListPage = () => {
    const rootLayoutContext = useContext(RootLayoutContext);
    if (!rootLayoutContext) {
        throw new Error("RootLayoutContext must be used within a RootLayoutProvider");
    }
    const { setCurrentSong } = rootLayoutContext;
    const [songs] = useState<Song[]>([
        {
            id: 1,
            title: "Yellow",
            album: "Parachutes",
            year: "2000",
            duration: "4:29",
            imageUrl: "/image/song-cover-yellow.jpg",
            audioUrl: "/audio/yellow.mp3"
        },
        {
            id: 2,
            title: "Fix You",
            album: "X&Y",
            year: "2005",
            duration: "4:55",
            imageUrl: "/image/song-cover-fix-you.jpg",
            audioUrl: "/audio/fix-you.mp3"
        },
        {
            id: 3,
            title: "Viva La Vida",
            album: "Viva la Vida or Death and All His Friends",
            year: "2008",
            duration: "4:01",
            imageUrl: "/image/song-cover-viva-la-vida.jpg",
            audioUrl: "/audio/viva-la-vida.mp3"
        },
    ]);

    const handleSongClick = (song: Song) => {
        setCurrentSong(song);
    };

    return (
        <div className="home-container">
            <Navigation />
            <div className="song-list-main">
                <div className="song-list-header">
                    <h1>Coldplay Songs</h1>
                    <div className="song-list-filters">
                        <select className="filter-dropdown">
                            <option value="">All Albums</option>
                            <option value="parachutes">Parachutes</option>
                            <option value="x&y">X&Y</option>
                            <option value="viva">Viva la Vida</option>
                        </select>
                        <select className="filter-dropdown">
                            <option value="">Sort By</option>
                            <option value="name">Name</option>
                            <option value="year">Year</option>
                            <option value="album">Album</option>
                        </select>
                    </div>
                </div>

                <div className="songs-grid">
                    {songs.map((song) => (
                        <div
                            key={song.id}
                            className="song-card"
                            onClick={() => handleSongClick(song)}
                        >
                            <div className="song-card-image" style={{ backgroundImage: `url(${song.imageUrl})` }}>
                                <div className="play-overlay">
                                    <span className="play-icon">▶</span>
                                </div>
                            </div>
                            <div className="song-card-content">
                                <h3 className="song-title">{song.title}</h3>
                                <p className="song-album">{song.album}</p>
                                <div className="song-meta">
                                    <span className="song-year">{song.year}</span>
                                    <span className="song-duration">{song.duration}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SongListPage;