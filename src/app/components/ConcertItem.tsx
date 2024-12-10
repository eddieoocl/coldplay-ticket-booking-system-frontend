import React from "react";
import { useRouter } from "next/navigation";
import "../styles/ConcertList.css";
import type { Concert } from "@/types/model/Concert";

interface ConcertItemProps {
    concert: Concert;
}

const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const ConcertItem: React.FC<ConcertItemProps> = ({ concert }) => {
    const router = useRouter();
    const [month, day] = concert.date.split(" ");

    const handleMoreDetail = (id: string) => {
        router.push(`/concert/${id}`);
    };

    return (
        <div className="item">
            <div className="item-text">
                <div className="item-title">
                    {month}{" "}
                    <span style={{ color: getRandomColor() }}>{day}</span>
                </div>
                <div className="item-year">{concert.year}</div>
            </div>
            <div className="item-venue">
                <div style={{ color: getRandomColor() }}>{concert.venue}</div>
                <div className="item-location">{concert.location}</div>
            </div>
            <div className="item-status">
                <button
                    className="more-detail-button"
                    onClick={() => handleMoreDetail(concert.concertId)}
                >
                    More Detail
                </button>
                <button
                    className="more-detail-button"
                    onClick={() => handleMoreDetail(concert.concertId)}
                >
                    {concert.status}
                </button>
            </div>
        </div>
    );
};

export default ConcertItem;
