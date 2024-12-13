"use client";

import { useState, useEffect } from "react";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export type Section = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    path: string;
    available: boolean;
    subSections: SubSection[];
};

type SubSection = {
    id: string;
    path: string;
};

const sectionData = [
    { id: 2, name: "Gold", price: 2780.0, quantity: 15 },
    { id: 1, name: "VIP", price: 3680.0, quantity: 50 },
    { id: 3, name: "Silver", price: 2250.0, quantity: 0 },
    { id: 4, name: "General", price: 1980.0, quantity: 14 },
    { id: 5, name: "Regular", price: 1680.0, quantity: 90 },
    { id: 7, name: "Back Row", price: 1099.0, quantity: 60 },
    { id: 6, name: "Economy", price: 1360.0, quantity: 80 },
];

const generateSections = (): Section[] => {
    return sectionData.map((section, index) => ({
        ...section,
        path: generateSectionPath(index, sectionData.length),
        available: section.quantity > 0,
        subSections: generateSubSections(index, sectionData.length, 5),
    }));
};

const sections = generateSections();

const priceColors: { [key: number]: string } = {
    3680: "#FF6B6B", // VIP
    2780: "#4ECDC4", // Gold
    2250: "#45B7D1", // Silver
    1980: "#FFA07A", // General
    1680: "#98D8C8", // Regular
    1360: "#F7DC6F", // Economy
    1099: "#D2B4DE", // Back Row
};

interface InteractiveVenueSelectorProps {
    onSectionSelect: (section: Section | null) => void;
    selectedTickets: { sectionId: number; quantity: number }[];
}

export default function InteractiveVenueSelector({
    onSectionSelect,
    selectedTickets,
}: InteractiveVenueSelectorProps) {
    const [currentSection, setCurrentSection] = useState<Section | null>(null);
    const [hoveredSection, setHoveredSection] = useState<Section | null>(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { t } = useTranslation();

    useEffect(() => {
        const selected = sections.find((section) =>
            selectedTickets.some((ticket) => ticket.sectionId === section.id)
        );
        //setSelectedSection(selected || null)
    }, [selectedTickets]);

    const handleSectionClick = (section: Section) => {
        if (!section.available) return;

        setCurrentSection(section);
        onSectionSelect(section);
    };

    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2));
    const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
    const handleReset = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-400">
                Section
            </h2>
            <div className="relative w-full aspect-square overflow-hidden">
                <div
                    className="absolute inset-0 cursor-move"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <svg
                        viewBox="0 0 1000 1000"
                        className="w-full h-full"
                        style={{
                            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                            transformOrigin: "center",
                            transition: isDragging
                                ? "none"
                                : "transform 0.3s ease",
                        }}
                    >
                        {/* Stage */}
                        <rect
                            x="400"
                            y="400"
                            width="200"
                            height="100"
                            fill="#333"
                        />
                        <text
                            x="500"
                            y="460"
                            textAnchor="middle"
                            fill="white"
                            className="text-sm"
                        >
                            STAGE
                        </text>

                        {/* Sections */}
                        {sections.map((section) => {
                            const isSelected = selectedTickets.some(
                                (ticket) => ticket.sectionId === section.id
                            );
                            const sectionColor =
                                priceColors[section.price] || "#999";
                            const centerX = getCenterX(section.path);
                            const centerY = getCenterY(section.path);
                            return (
                                <g
                                    key={section.id}
                                    onClick={() => handleSectionClick(section)}
                                    onMouseEnter={() =>
                                        setHoveredSection(section)
                                    }
                                    onMouseLeave={() => setHoveredSection(null)}
                                >
                                    {section.subSections.map((subSection) => (
                                        <path
                                            key={subSection.id}
                                            d={subSection.path}
                                            fill={
                                                !section.available
                                                    ? "#666"
                                                    : isSelected
                                                      ? "#4CAF50"
                                                      : sectionColor
                                            }
                                            stroke="#000"
                                            strokeWidth="1"
                                            opacity={
                                                section.available ? 0.8 : 0.4
                                            }
                                            className="transition-colors duration-200 hover:opacity-100 cursor-pointer"
                                        />
                                    ))}
                                    <text
                                        x={centerX}
                                        y={centerY}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill="white"
                                        fontSize="16"
                                        fontWeight="bold"
                                        className="pointer-events-none"
                                    >
                                        {section.name}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {/* Tooltip */}
                {hoveredSection && (
                    <div
                        className="absolute bg-black bg-opacity-75 text-white p-2 rounded pointer-events-none"
                        style={{
                            left: `${mousePosition.x}px`,
                            top: `${mousePosition.y}px`,
                            transform: "translate(10px, 10px)",
                        }}
                    >
                        <p>{hoveredSection.name}</p>
                        <p>
                            {t("Price")}: ${hoveredSection.price}
                        </p>
                        <p>
                            {t("Remaining")}: {hoveredSection.quantity}
                        </p>
                    </div>
                )}

                {/* Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                    <button
                        onClick={handleZoomIn}
                        className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                        <ZoomIn className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleZoomOut}
                        className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                        <ZoomOut className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleReset}
                        className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                        <Maximize2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Section Info */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-blue-300">
                    {t("Section Information")}
                </h3>
                {currentSection ? (
                    <div className="text-white">
                        <p>
                            {t("Selected Section")}: {currentSection.name}
                        </p>
                        <p>
                            {t("Price")}: ${currentSection.price}
                        </p>
                        <p>
                            {t("Remaining")}: {currentSection.quantity}
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

// Helper functions
function generateSectionPath(index: number, total: number): string {
    const centerX = 500;
    const centerY = 500;
    const outerRadius = 400;
    const innerRadius = 200;
    const angle = (2 * Math.PI) / total;
    const startAngle = index * angle;
    const endAngle = (index + 1) * angle;

    const x1 = centerX + preciseRound(outerRadius * Math.cos(startAngle), 6);
    const y1 = centerY + preciseRound(outerRadius * Math.sin(startAngle), 6);
    const x2 = centerX + preciseRound(outerRadius * Math.cos(endAngle), 6);
    const y2 = centerY + preciseRound(outerRadius * Math.sin(endAngle), 6);
    const x3 = centerX + preciseRound(innerRadius * Math.cos(endAngle), 6);
    const y3 = centerY + preciseRound(innerRadius * Math.sin(endAngle), 6);
    const x4 = centerX + preciseRound(innerRadius * Math.cos(startAngle), 6);
    const y4 = centerY + preciseRound(innerRadius * Math.sin(startAngle), 6);

    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`;
}

function generateSubSections(
    sectionIndex: number,
    totalSections: number,
    subSectionsPerSection: number
): SubSection[] {
    const subSections: SubSection[] = [];
    const angle = (2 * Math.PI) / totalSections;
    const subAngle = angle / subSectionsPerSection;

    for (let i = 0; i < subSectionsPerSection; i++) {
        const startAngle = sectionIndex * angle + i * subAngle;
        const endAngle = startAngle + subAngle;

        const path = generateSubSectionPath(startAngle, endAngle);
        subSections.push({
            id: `${sectionIndex}-${i}`,
            path,
        });
    }

    return subSections;
}

function generateSubSectionPath(startAngle: number, endAngle: number): string {
    const centerX = 500;
    const centerY = 500;
    const outerRadius = 400;
    const innerRadius = 200;

    const x1 = centerX + preciseRound(outerRadius * Math.cos(startAngle), 6);
    const y1 = centerY + preciseRound(outerRadius * Math.sin(startAngle), 6);
    const x2 = centerX + preciseRound(outerRadius * Math.cos(endAngle), 6);
    const y2 = centerY + preciseRound(outerRadius * Math.sin(endAngle), 6);
    const x3 = centerX + preciseRound(innerRadius * Math.cos(endAngle), 6);
    const y3 = centerY + preciseRound(innerRadius * Math.sin(endAngle), 6);
    const x4 = centerX + preciseRound(innerRadius * Math.cos(startAngle), 6);
    const y4 = centerY + preciseRound(innerRadius * Math.sin(startAngle), 6);

    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`;
}

function getCenterX(path: string): number {
    const matches = path.match(/[ML]\s*(\d+(?:\.\d+)?)/g);
    if (!matches) return 500;
    const sum = matches.reduce(
        (acc, match) => acc + parseFloat(match.split(/\s+/)[1]),
        0
    );
    return preciseRound(sum / matches.length, 6);
}

function getCenterY(path: string): number {
    const matches = path.match(/[ML]\s*\d+(?:\.\d+)?\s+(\d+(?:\.\d+)?)/g);
    if (!matches) return 500;
    const sum = matches.reduce(
        (acc, match) => acc + parseFloat(match.split(/\s+/)[2]),
        0
    );
    return preciseRound(sum / matches.length, 6);
}

function preciseRound(num: number, decimals: number): number {
    const t = Math.pow(10, decimals);
    return Number(
        (
            Math.round(
                num * t +
                    (decimals > 0 ? 1 : 0) *
                        (Math.sign(num) * (10 / Math.pow(100, decimals)))
            ) / t
        ).toFixed(decimals)
    );
}
