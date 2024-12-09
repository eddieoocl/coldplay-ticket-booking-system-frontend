"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useGetConcertsQuery } from "@/lib/api/apiSlice";
import "../styles/ConcertList.css";

const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const ConcertList: React.FC = () => {
    const router = useRouter();
    const { data: concerts, error, isLoading } = useGetConcertsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading concerts</div>;

    const handleMoreDetail = (id: string) => {
        router.push(`/concert/${id}`);
    };

    return (
        <div className="concert-list-container">
            <h1 className="title">MUSIC of the SPHERES</h1>
            <div className="grid">
                {concerts?.map((concert, index) => {
                    const [month, day] = concert.date.split(" ");
                    return (
                        <div key={index} className="item">
                            <div className="item-text">
                                <div className="item-title">
                                    {month}{" "}
                                    <span style={{ color: getRandomColor() }}>
                                        {day}
                                    </span>
                                </div>
                                <div className="item-year">{concert.year}</div>
                            </div>
                            <div className="item-venue">
                                <div style={{ color: getRandomColor() }}>
                                    {concert.venue}
                                </div>
                                <div className="item-location">
                                    {concert.location}
                                </div>
                            </div>
                            <div className="item-status">
                                <button
                                    className="more-detail-button"
                                    onClick={() => handleMoreDetail(concert.concertId)}
                                >
                                    More Detail
                                </button>
                                {concert.status}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ConcertList;