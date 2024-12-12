"use client";

import { useState } from "react";
import { Grid, Square } from "lucide-react";

type Seat = {
    id: string;
    row: string;
    number: number;
    status: "available" | "selected" | "unavailable";
};

const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = ["A", "B", "C", "D", "E"];
    rows.forEach((row) => {
        for (let i = 1; i <= 10; i++) {
            seats.push({
                id: `${row}${i}`,
                row,
                number: i,
                status: Math.random() > 0.2 ? "available" : "unavailable",
            });
        }
    });
    return seats;
};

export default function SeatSelector({
    onSeatSelect,
}: {
    onSeatSelect: (seats: string[]) => void;
}) {
    const [seats, setSeats] = useState<Seat[]>(generateSeats());

    const toggleSeat = (seatId: string) => {
        setSeats((prevSeats) =>
            prevSeats.map((seat) =>
                seat.id === seatId && seat.status !== "unavailable"
                    ? {
                          ...seat,
                          status:
                              seat.status === "available"
                                  ? "selected"
                                  : "available",
                      }
                    : seat
            )
        );
        const selectedSeats = seats
            .filter((seat) => seat.status === "selected")
            .map((seat) => seat.id);
        onSeatSelect(selectedSeats);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-400">
                选择座位
            </h2>
            <div className="grid grid-cols-10 gap-2 mb-4">
                {seats.map((seat) => (
                    <button
                        key={seat.id}
                        onClick={() => toggleSeat(seat.id)}
                        className={`w-8 h-8 flex items-center justify-center rounded ${
                            seat.status === "available"
                                ? "bg-green-500 hover:bg-green-600"
                                : seat.status === "selected"
                                  ? "bg-blue-500 hover:bg-blue-600"
                                  : "bg-gray-500 cursor-not-allowed"
                        } transition-colors duration-200`}
                        disabled={seat.status === "unavailable"}
                    >
                        <Square className="w-4 h-4" />
                    </button>
                ))}
            </div>
            <div className="flex justify-center space-x-4">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                    <span className="text-sm text-gray-300">可选</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                    <span className="text-sm text-gray-300">已选</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-500 rounded mr-2"></div>
                    <span className="text-sm text-gray-300">不可选</span>
                </div>
            </div>
            <div className="mt-4 text-center">
                <Grid className="inline-block mr-2 text-yellow-400" />
                <span className="text-yellow-400">舞台</span>
            </div>
        </div>
    );
}
