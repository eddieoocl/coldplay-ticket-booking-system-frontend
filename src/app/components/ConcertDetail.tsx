"use client";

import React from "react";
import { useRouter, useParams, redirect } from "next/navigation";
import { useGetConcertByIdQuery } from "@/lib/api/apiSlice";
import "../styles/ConcertDetail.css";
import Image from "next/image";

const ConcertDetail: React.FC = () => {
    const router = useRouter();
    const { id } = useParams();
    const {
        data: concert,
        error,
        isLoading,
    } = useGetConcertByIdQuery({ id: id as string });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading concert details</div>;

    const handleClick = () => {
        if (concert?.status !== "SOLD OUT") {
            redirect(`/select-order?concertId=${id}`);
        }
    };

    return (
        <div className="app">
            <button className="back-button" onClick={() => router.back()}>
                Back
            </button>
            <div className="content">
                <div className="date">{concert?.date}</div>
                <div className="divider" />
                <h1 className="stadium">{concert?.name}</h1>
                <div className="details">
                    <div className="location">
                        LOCATION
                        <br />
                        {concert?.location}
                    </div>
                    <div className="description">
                        DESCRIPTION
                        <br />
                        {concert?.description}
                    </div>
                </div>
                <button className="view-map-btn">VIEW ON MAP</button>
                <div>
                    <button
                        className="status-button"
                        style={{
                            backgroundColor:
                                concert?.status === "SOLD OUT"
                                    ? "gray"
                                    : "#f59e0b",
                        }}
                        disabled={concert?.status === "SOLD OUT"}
                        onClick={handleClick}
                    >
                        {concert?.status}
                    </button>
                </div>
            </div>
            <div className="background">
                <div className="rainbow" />
                <Image
                    className="heart-icon"
                    src="https://www.coldplay.com/wp/wp-content/uploads/2024/06/heart-orange.svg"
                    alt="Heart Icon"
                    width={130}
                    height={130}
                />
            </div>
        </div>
    );
};

export default ConcertDetail;
