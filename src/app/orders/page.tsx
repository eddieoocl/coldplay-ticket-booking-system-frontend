"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/databoard/card";
import {
    CalendarIcon,
    CreditCardIcon,
    ShoppingBagIcon,
    TagIcon,
    TicketIcon,
} from "lucide-react";
import { useGetAllOrdersQuery } from "@/lib/api/apiSlice";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar/Navbar";
import { useTranslation } from "react-i18next";

export default function OrdersPage() {
    const router = useRouter();
    const { data: orders, error, isLoading } = useGetAllOrdersQuery();

    const { t } = useTranslation();

    const handleViewDetails = (order: OrderResponse) => {
        if (order.paymentStatus === "PENDING") {
            router.push(`/confirm-order?orderId=${order.orderId}`);
        } else {
            router.push(`/order?orderId=${order.orderId}&animation=false`);
        }
    };

    const getTicketCount = (order: OrderResponse) =>
        order.ticketInfo?.length || 0;
    const getMerchandiseCount = (order: OrderResponse) =>
        order.merchandiseInfo?.reduce(
            (sum, item) => sum + (item.count || 0),
            0
        ) || 0;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading orders</div>;

    if (!orders || orders.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
                <div className="container mx-auto px-4 py-16">
                    <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">
                        {t("My Order")}
                    </h1>
                    <div className="text-center text-white">
                        {t("No Order")}
                    </div>
                </div>
            </div>
        );
    }

    function getStatusText(status: string) {
        switch (status) {
            case "PAID":
                return t("Paid");
            case "PENDING":
                return t("Pending");
            case "completed":
                return t("Completed");
            default:
                return t("Unknown");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
            <Navbar />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">
                    {t("My Order")}
                </h1>
                <div className="grid gap-6">
                    {orders?.map((order) => (
                        <Card
                            key={order.orderId}
                            className="bg-gray-800 border-0 shadow-xl"
                        >
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-xl text-white">
                                    {t("Order")} #{order.orderId}
                                </CardTitle>
                                <span
                                    className={`text-sm px-2 py-1 rounded ${getStatusColor(order.paymentStatus)}`}
                                >
                                    {getStatusText(order.paymentStatus)}
                                </span>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center text-gray-300">
                                        <TagIcon className="mr-2 h-4 w-4" />
                                        <span>{order.concertData.name}</span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        <span>
                                            {new Date(order.concertData.date)
                                                .toLocaleString("en-GB", {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: false,
                                                })
                                                .replace(",", "")}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-300">
                                        <CreditCardIcon className="mr-2 h-4 w-4" />
                                        <span>${order.totalPrices}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-gray-300">
                                            <TicketIcon className="mr-2 h-4 w-4" />
                                            <span>
                                                {t("Number of Ticket")}:{" "}
                                                {getTicketCount(order)}
                                            </span>
                                            <ShoppingBagIcon className="ml-4 mr-2 h-4 w-4" />
                                            <span>
                                                {t("Number of Merchandise")}:{" "}
                                                {getMerchandiseCount(order)}{" "}
                                            </span>
                                        </div>
                                        <button
                                            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-4 py-2 rounded"
                                            onClick={() =>
                                                handleViewDetails(order)
                                            }
                                        >
                                            {t("Details")}
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

function getStatusColor(status: string) {
    switch (status) {
        case "PAID":
            return "bg-blue-600 text-white";
        case "PENDING":
            return "bg-yellow-600 text-white";
        case "completed":
            return "bg-green-600 text-white";
        default:
            return "bg-gray-600 text-white";
    }
}
