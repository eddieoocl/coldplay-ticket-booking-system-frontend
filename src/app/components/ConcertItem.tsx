// src/app/components/ConcertItem.tsx
import React from "react";
import { useTranslation } from "react-i18next";

interface Concert {
    date: string;
    year: string;
    venue: string;
    location: string;
    status: string;
    concertId: string;
}

interface ConcertItemProps {
    concert: Concert;
    onMoreDetail: (id: string) => void;
}

const ConcertItem: React.FC<ConcertItemProps> = ({ concert, onMoreDetail }) => {
    const { t } = useTranslation();
    const [month, day] = concert.date.split(" ");

    return (
        <div className="item">
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
                    onClick={() => onMoreDetail(concert.concertId)}
                >
                    {t("More Detail")}
                </button>
                <span className={concert.status === "SOLD OUT" ? "sold-out" : ""}>
                    {concert.status}
                </span>
            </div>
        </div>
    );
};

export default ConcertItem;