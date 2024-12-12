"use client";

// src/app/page.tsx
import { useTranslation } from "react-i18next";
import Navbar from "./components/navbar/Navbar";
import "./styles/page.css";
import Link from "next/link";

export default function Home() {
    const { t } = useTranslation();

    return (
        <div className="home-container">
            <Navbar />

            <div className="h-screen relative overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                >
                    <source src="/video/coldplay.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay content */}
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 text-yellow-400">
                        {t("Welcome to")} Coldplay Tix
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-blue-300">
                        {t("Explore the World of Coldplay Together")}
                    </p>
                    <Link
                        href="/concerts"
                        className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
                    >
                        {t("View Tour Dates")}
                    </Link>
                </div>
            </div>

            {/*<section className="hero-section video-home-container">*/}
            {/*    <video autoPlay loop muted playsInline className="hero-video">*/}
            {/*        <source src="/video/coldplay.mp4" type="video/mp4" />*/}
            {/*    </video>*/}
            {/*</section>*/}

            {/*<section className="image-section">*/}
            {/*    <div className="image-background"></div>*/}
            {/*    <div className="content-wrapper">*/}
            {/*        <div className="concert-container">*/}
            {/*            <ConcertList />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </div>
    );
}
