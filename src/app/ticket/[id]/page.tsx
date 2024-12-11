"use client";

import { useGetOrderByIdQuery } from "@/lib/api/apiSlice";
import { useParams } from "next/navigation";
import QRCode from "react-qr-code";
import "../../styles/TicketPage.css";
import { v4 as uuidv4 } from "uuid";

export default function TicketPage() {
    const { id } = useParams();
    const { data: ticketData } = useGetOrderByIdQuery({
        id: parseInt(id as string),
    });

    if (!ticketData) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    const merchQRCodeValue = `Order ID: ${ticketData.orderId}, Merch Items: ${ticketData.merchandiseInfo
        .map((merch) => `${merch.merchandiseName} - ${merch.count}`)
        .join(", ")}`;

    const generateTicketNumber = (orderTime: string) => {
        const orderTimeUnix = new Date(orderTime).getTime() / 1000; // Convert order time to Unix time in seconds
        const uuid = uuidv4();

        return `${orderTimeUnix}-${uuid}`;
    };

    return (
        <div className="mx-auto p-4 ticket-page-container">
            <h1 className="text-3xl font-bold mb-4">Ticket Information</h1>
            {ticketData.ticketInfo.map((ticket, index) => (
                <div
                    key={index}
                    className="ticket-card shadow-md rounded-lg p-6 mb-6"
                >
                    <h2 className="text-2xl font-semibold mb-4">
                        Ticket #{index + 1}
                    </h2>
                    <div className="mb-4">
                        <p className="text-lg">
                            <strong>Order ID:</strong> {ticketData.orderId}
                        </p>
                        <p className="text-lg">
                            <strong>Total Prices:</strong> $
                            {ticketData.totalPrices}
                        </p>
                        <p className="text-lg">
                            <strong>Order Time:</strong> {ticketData.orderTime}
                        </p>
                        <p className="text-lg">
                            <strong>Order Status:</strong>{" "}
                            {ticketData.orderStatus}
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="text-lg">
                            <strong>Ticket Type:</strong> {ticket.ticketType}
                        </p>
                        <p className="text-lg">
                            <strong>Ticket Holder:</strong> {ticket.moviegoer}
                        </p>
                        <p className="text-lg">
                            <strong>Ticket Number:</strong>
                            <br />
                            {generateTicketNumber(ticketData.orderTime)}
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <div className="bg-white p-2">
                            <QRCode
                                value={`Order ID: ${ticketData.orderId}, Ticket Type: ${ticket.ticketType}, Name: ${ticket.moviegoer}`}
                                size={148}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <h2 className="text-3xl font-bold mb-4">Merch Order</h2>
            <div className="merch-card shadow-md rounded-lg p-6 mb-6">
                <div className="mb-4">
                    <p className="text-lg">
                        <strong>Order ID:</strong> {ticketData.orderId}
                    </p>
                    <p className="text-lg">
                        <strong>Total Prices:</strong> ${ticketData.totalPrices}
                    </p>
                    <p className="text-lg">
                        <strong>Order Time:</strong> {ticketData.orderTime}
                    </p>
                    <p className="text-lg">
                        <strong>Order Status:</strong> {ticketData.orderStatus}
                    </p>
                </div>
                <h2 className="text-2xl font-semibold mb-4">
                    Merchandise Info
                </h2>
                <ul className="list-disc list-inside mb-4">
                    {ticketData.merchandiseInfo.map((merchandise, index) => (
                        <li key={index} className="mb-2">
                            {merchandise.merchandiseName} - {merchandise.count}
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center">
                    <QRCode value={merchQRCodeValue} size={148} />
                </div>
            </div>
        </div>
    );
}
