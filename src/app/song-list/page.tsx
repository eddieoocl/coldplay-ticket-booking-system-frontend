// src/app/song-list/page.tsx
"use client";

import { useState, useContext } from "react";
import Navigation from "../components/navbar/Navbar";
import "../styles/page.css";
import "../styles/SongList.css";
import { RootLayoutContext } from "../layout";
import { useTranslation } from "react-i18next";

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
        throw new Error(
            "RootLayoutContext must be used within a RootLayoutProvider"
        );
    }
    const { setCurrentSong } = rootLayoutContext;

    const { t } = useTranslation();

    const [songs] = useState<Song[]>([
        {
            id: 1,
            title: "Yellow",
            album: "Parachutes",
            year: "2000",
            duration: "4:29",
            imageUrl: "/image/song-cover-yellow.jpg",
            audioUrl: "/audio/yellow.mp3",
        },
        {
            id: 2,
            title: "Fix You",
            album: "X&Y",
            year: "2005",
            duration: "4:55",
            imageUrl: "/image/song-cover-fix-you.jpg",
            audioUrl: "/audio/fix-you.mp3",
        },
        {
            id: 3,
            title: "Viva La Vida",
            album: "Viva la Vida or Death and All His Friends",
            year: "2008",
            duration: "4:01",
            imageUrl: "/image/song-cover-viva-la-vida.jpg",
            audioUrl: "/audio/viva-la-vida.mp3",
        },
        {
            id: 4,
            title: "Clocks",
            album: "A Rush of Blood to the Head",
            year: "2002",
            duration: "5:07",
            imageUrl: "/image/song-cover-clocks.jpg",
            audioUrl: "/audio/clocks.mp3",
        },
        {
            id: 5,
            title: "Paradise",
            album: "Mylo Xyloto",
            year: "2011",
            duration: "4:38",
            imageUrl: "/image/song-cover-paradise.jpg",
            audioUrl: "/audio/paradise.mp3",
        },
        {
            id: 6,
            title: "The Scientist",
            album: "A Rush of Blood to the Head",
            year: "2002",
            duration: "5:09",
            imageUrl: "/image/song-cover-the-scientist.jpg",
            audioUrl: "/audio/the-scientist.mp3",
        },
        {
            id: 7,
            title: "Adventure of a Lifetime",
            album: "A Head Full of Dreams",
            year: "2015",
            duration: "4:23",
            imageUrl: "/image/song-cover-adventure-of-a-lifetime.jpg",
            audioUrl: "/audio/adventure-of-a-lifetime.mp3",
        },
        {
            id: 8,
            title: "Hymn for the Weekend",
            album: "A Head Full of Dreams",
            year: "2015",
            duration: "4:18",
            imageUrl: "/image/song-cover-hymn-for-the-weekend.jpg",
            audioUrl: "/audio/hymn-for-the-weekend.mp3",
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
                    <div className="song-list-h1-title">
                        <h1>Coldplay {t("Songs")}</h1>
                    </div>
                    <div className="song-list-filters">
                        <select className="filter-dropdown">
                            <option value="">{t("All Albums")}</option>
                            <option value="parachutes">Parachutes</option>
                            <option value="x&y">X&Y</option>
                            <option value="viva">Viva la Vida</option>
                        </select>
                        <select className="filter-dropdown">
                            <option value="">{t("Sort by")}</option>
                            <option value="name">{t("Name")}</option>
                            <option value="year">{t("Year")}</option>
                            <option value="album">{t("Album")}</option>
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
                            <div
                                className="song-card-image"
                                style={{
                                    backgroundImage: `url(${song.imageUrl})`,
                                }}
                            >
                                <div className="play-overlay">
                                    <span className="play-icon">▶</span>
                                </div>
                            </div>
                            <div className="song-card-content">
                                <h3 className="song-title">{song.title}</h3>
                                <p className="song-album">{song.album}</p>
                                <div className="song-meta">
                                    <span className="song-year">
                                        {song.year}
                                    </span>
                                    <span className="song-duration">
                                        {song.duration}
                                    </span>
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
