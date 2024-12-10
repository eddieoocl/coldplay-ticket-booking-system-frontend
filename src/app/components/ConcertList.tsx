// src/app/components/ConcertList.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useGetConcertsQuery } from "@/lib/api/apiSlice";
import { useTranslation } from "react-i18next";
import "../styles/ConcertList.css";

interface ConcertListProps {
    className?: string;
}

const ConcertList: React.FC<ConcertListProps> = ({ className }) => {
    const router = useRouter();
    const { data: concerts, error, isLoading } = useGetConcertsQuery();
    const { t } = useTranslation();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading concerts</div>;

    const handleMoreDetail = (id: string) => {
        router.push(`/concert/${id}`);
    };

    return (
        <div className={`concert-list-container ${className}`}>
            <h1 className="title">MUSIC of the SPHERES</h1>
            <div className="grid">
                {concerts?.map((concert, index) => {
                    const [month, day] = concert.date.split(" ");
                    return (
                        <div key={index} className="item">
                            <div className="item-text">
                                <div className="item-title">
                                    {month} <span>{day}</span>
                                </div>
                                <div className="item-year">{concert.year}</div>
                            </div>
                            <div className="item-venue">
                                <div>{concert.venue}</div>
                                <div className="item-location">{concert.location}</div>
                            </div>
                            <div className="item-status">
                                <button
                                    className="more-detail-button"
                                    onClick={() => handleMoreDetail(concert.concertId)}
                                >
                                    {t('More Detail')}
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