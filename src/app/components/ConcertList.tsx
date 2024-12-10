"use client";

import React from "react";
import { useGetConcertsQuery } from "@/lib/api/apiSlice";
import ConcertItem from "./ConcertItem";
import "../styles/ConcertList.css";

const ConcertList: React.FC = () => {
    const { data: concerts, error, isLoading } = useGetConcertsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading concerts</div>;

    return (
        <div className="concert-list-container">
            <div className="title">MUSIC of the SPHERES</div>
            <div className="grid">
                {concerts?.map((concert, index) => (
                    <ConcertItem key={index} concert={concert} />
                ))}
            </div>
        </div>
    );
};

export default ConcertList;