"use client";

import React from "react";
import { CreditCard, Leaf, Package, Ticket } from "lucide-react";
import ProgressBar from "@/app/components/ProgressBar";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetOrderByIdQuery } from "@/lib/api/apiSlice";
import Navbar from "@/app/components/navbar/Navbar";
import { useTranslation } from "react-i18next";

export default function OrderConfirmation() {
    const router = useRouter();
    const params = useSearchParams();
    const orderId = params.get("orderId");
    const { data: order, isLoading: isLoadingOrder } = useGetOrderByIdQuery({
        id: orderId ? Number(orderId) : 0,
    });
    const { t } = useTranslation();

    const steps = [
        { name: t("Select Order"), href: "", status: "complete" as const },
        {
            name: t("Ticket Confirmation"),
            href: "",
            status: "current" as const,
        },
        { name: t("Payment"), href: "", status: "upcoming" as const },
        { name: t("View Order"), href: "", status: "upcoming" as const },
    ];

    if (!order || isLoadingOrder) {
        return <div>Loading...</div>;
    }

    const handlePayment = () => {
        // Payment logic
        router.push(`/payment?orderId=${orderId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
            <Navbar />
            <div className="container mx-auto px-4 py-16">
                <ProgressBar steps={steps} />
                <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">
                    {t("Order Confirmation")}
                </h1>

                <div className="bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-blue-300 flex items-center">
                        <CreditCard className="mr-2" /> {t("Order Information")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <p className="text-white">
                            <span className="text-gray-400">
                                {t("Order Id")}:
                            </span>{" "}
                            {order.orderId}
                        </p>
                        <p className="text-white">
                            <span className="text-gray-400">{t("Date")}:</span>{" "}
                            {order.orderTime}
                        </p>
                        <p className="text-white">
                            <span className="text-gray-400">{t("Total")}:</span>{" "}
                            ${order.totalPrices}
                        </p>
                        <p className="text-white">
                            <span className="text-gray-400">
                                {t("Activity")}:
                            </span>{" "}
                            {order.concertData.name}
                        </p>
                        <p className="text-white">
                            <span className="text-gray-400">
                                {t("Order Status")}:
                            </span>{" "}
                            {order.paymentStatus}
                        </p>
                    </div>
                    <div className="mt-4 bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2 text-yellow-400">
                            {t("Concert Detail")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <p className="text-white">
                                <span className="text-gray-400">
                                    {t("Date")}:
                                </span>{" "}
                                {order.concertData.date}
                            </p>
                            <p className="text-white">
                                <span className="text-gray-400">
                                    {t("Time")}:
                                </span>{" "}
                                {order.concertData.time}
                            </p>
                            <p className="text-white">
                                <span className="text-gray-400">
                                    {t("Venue")}:
                                </span>{" "}
                                {order.concertData.venue}
                            </p>
                        </div>
                        <p className="text-white mt-2">
                            <span className="text-gray-400">{t("Total")}:</span>{" "}
                            {order.concertData.address}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-8">
                        <h2 className="text-2xl font-bold mb-4 text-green-300 flex items-center">
                            <Ticket className="mr-2" />{" "}
                            {t("Ticket Information")}
                        </h2>
                        {order.ticketInfo.map((ticket) => (
                            <div
                                key={ticket.id}
                                className="mb-6 last:mb-0 bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-lg font-semibold text-white">
                                        {ticket.ticketType}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        {t("Seat")}: {t("Waiting for Payment")}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        {t("Price")}: ${ticket.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-xl p-8">
                        <h2 className="text-2xl font-bold mb-4 text-pink-300 flex items-center">
                            <Package className="mr-2" /> {t("Merchandise")}
                        </h2>
                        {order.merchandiseInfo.map((item) => (
                            <div
                                key={item.merchandiseId}
                                className={`mb-4 last:mb-0 rounded-lg p-4 ${item.isCharity ? "bg-green-700" : "bg-gray-700"} flex justify-between items-center`}
                            >
                                <div>
                                    <p className="text-lg font-semibold text-white flex items-center">
                                        {item.merchandiseName}
                                        {item.isCharity && (
                                            <Leaf
                                                className="ml-2 text-green-300"
                                                size={16}
                                            />
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        {t("Quantity")}: {item.count}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        {t("Unit Price")}: ${item.price}
                                    </p>
                                    <p className="text-sm font-semibold text-white">
                                        {t("Total")}: ${item.price * item.count}
                                    </p>
                                    {item.isCharity && (
                                        <p className="text-xs text-green-300 mt-1">
                                            {t("Charity Item")}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={handlePayment}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                    >
                        {t("Pay")}
                    </button>
                </div>
            </div>
        </div>
    );
}
