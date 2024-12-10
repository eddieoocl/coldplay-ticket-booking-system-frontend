// src/app/components/ConcertList.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useGetConcertsQuery } from "@/lib/api/apiSlice";
import { useTranslation } from "react-i18next";
import ConcertItem from "./ConcertItem";
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
                {concerts?.map((concert, index) => (
                    <ConcertItem
                        key={index}
                        concert={concert}
                        onMoreDetail={handleMoreDetail}
                    />
                ))}
            </div>
        </div>
    );
};

export default ConcertList;
