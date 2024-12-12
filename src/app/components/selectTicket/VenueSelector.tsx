"use client";

import { useState } from "react";

type Area = {
    id: string;
    name: string;
    capacity: number;
    price: number;
    color: string;
};

const areas: Area[] = [
    {
        id: "vip",
        name: "VIP区",
        capacity: 100,
        price: 1000,
        color: "bg-red-500",
    },
    { id: "a", name: "A区", capacity: 200, price: 800, color: "bg-blue-500" },
    { id: "b", name: "B区", capacity: 300, price: 600, color: "bg-green-500" },
    { id: "c", name: "C区", capacity: 400, price: 400, color: "bg-yellow-500" },
    { id: "d", name: "D区", capacity: 500, price: 200, color: "bg-purple-500" },
];

export default function VenueSelector({
    onAreaSelect,
}: {
    onAreaSelect: (area: Area | null) => void;
}) {
    const [selectedArea, setSelectedArea] = useState<Area | null>(null);

    const handleAreaClick = (area: Area) => {
        if (selectedArea?.id === area.id) {
            setSelectedArea(null);
            onAreaSelect(null);
        } else {
            setSelectedArea(area);
            onAreaSelect(area);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-400">
                Section
            </h2>
            <div className="relative w-full aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 border-4 border-white rounded-full flex items-center justify-center">
                        <div className="w-1/2 h-1/2 border-4 border-white rounded-full flex items-center justify-center">
                            <div className="w-1/4 h-1/4 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                </div>
                {areas.map((area, index) => (
                    <button
                        key={area.id}
                        onClick={() => handleAreaClick(area)}
                        className={`absolute w-1/5 h-1/5 ${area.color} rounded-full flex items-center justify-center text-white font-bold ${
                            selectedArea?.id === area.id
                                ? "ring-4 ring-white"
                                : ""
                        }`}
                        style={{
                            top: `${50 - 40 * Math.cos((index * 2 * Math.PI) / areas.length)}%`,
                            left: `${50 + 40 * Math.sin((index * 2 * Math.PI) / areas.length)}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        {area.name}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-blue-300">
                    {t("Section Information")}
                </h3>
                {selectedArea ? (
                    <div className="text-white">
                        <p>
                            {t("Selected Section")}: {selectedArea.name}
                        </p>
                        <p>容量: {selectedArea.capacity}人</p>
                        <p>
                            {t("Price")}: ${selectedArea.price}
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-400">
                        {t("Please Select a Section")}
                    </p>
                )}
            </div>
        </div>
    );
}
